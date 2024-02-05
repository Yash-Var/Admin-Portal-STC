import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { tokens } from "../theme";
import { Box, Typography, useTheme, Button } from "@mui/material";
import {
  Container,
  Paper,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  setReportPageStatus,
  setReportPage,
  setStatus,
} from "../utils/reportSlice";
import CompanyInformationModal from "./ReportEditModal";
import { useNavigate } from "react-router-dom";

const ReportPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const companyInfo = useSelector((state) => state.report.ReportPage);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseModal = () => {
    fetchData();
    setOpenModal(false);
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this company?"
      );
      if (confirmDelete) {
        const response = await axios.get(
          `http://localhost:5000/api/admin/deleteCompanyData/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(setStatus("Pending Approval"));
        navigate("/reportstatus");
      } else {
        console.error("Deletion cancelled by user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/getCompanyDataByDataId/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data.data[0];
      dispatch(setReportPage(data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatus = async (temp) => {
    const status = temp ? "Approved" : "Rejected";
    try {
      const obj = { companyReportApprovalStatus: status };
      const response = await axios.post(
        `http://localhost:5000/api/admin/updateCompanyDataID/${id}`,
        obj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(setReportPageStatus(true));
      dispatch(setStatus("Pending Approval"));
      navigate("/reportstatus");
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = () => {
    setOpenModal(true);
  };
  return (
    <>
      <Container>
        <Box my="20px">
          <Box display="flex" justifyContent="space-between" mb="20px">
            <Typography variant="h1" color={colors.primary[100]}>
              {companyInfo.companyName}
            </Typography>
            <Box display="flex" justifyContent="end">
              {companyInfo.companyReportApprovalStatus === "Pending Approval" &&
                localStorage.getItem("user") === "Super Admin" && (
                  <>
                    <Box my="20px" mr="5px">
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        onClick={() => handleStatus(true)}
                      >
                        {/* <DoneOutlinedIcon /> */}
                        Accept
                      </Button>
                    </Box>
                    <Box my="20px" mx="5px">
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        onClick={() => handleStatus(false)}
                      >
                        Reject
                      </Button>
                    </Box>
                  </>
                )}
              {companyInfo.companyReportApprovalStatus !== "Approved" && (
                <>
                  <Box my="20px" mr="5px">
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      onClick={() => handleEdit()}
                    >
                      Edit
                    </Button>
                  </Box>
                  <Box my="20px">
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      onClick={() => handleDelete()}
                    >
                      Delete
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Box>
          <Divider />
          <Grid style={{ marginBottom: "20px" }}>
            <Typography
              variant="h3"
              color={colors.primary[100]}
              style={{ marginTop: "10px" }}
            >
              Company Name: {companyInfo.companyName}
            </Typography>
            <Typography
              variant="h5"
              color={colors.primary[100]}
              style={{ marginTop: "10px" }}
            >
              Number of Rounds: {companyInfo.companyNumOfRounds}
            </Typography>
            <Typography
              variant="h5"
              color={colors.primary[100]}
              style={{ marginTop: "10px" }}
            >
              CTC: {companyInfo.companyCTC}
            </Typography>
            <Typography
              variant="h5"
              color={colors.primary[100]}
              style={{ marginTop: "10px" }}
            >
              Eligibility: {companyInfo.companyEligibility}
            </Typography>
            <Typography
              variant="h5"
              color={colors.primary[100]}
              style={{ marginTop: "10px" }}
            >
              Job Profile: {companyInfo.companyJOBProfile}
            </Typography>
          </Grid>
          <Divider />
          <Grid style={{ marginBottom: "20px" }}>
            <Typography
              variant="h3"
              color={colors.primary[100]}
              style={{ marginTop: "10px" }}
            >
              Rounds Information:
            </Typography>
            <Typography
              variant="h4"
              color={colors.primary[100]}
              style={{ marginTop: "10px" }}
            >
              <span style={{ fontWeight: "bold" }}>First Round:</span>
              <span>{companyInfo.companyFirstRoundName}</span>
            </Typography>
            <Typography
              variant="h5"
              color={colors.primary[100]}
              style={{ marginTop: "5px" }}
            >
              <span style={{ marginLeft: "8px", fontStyle: "italic" }}>
                Description:
              </span>
              <span>{companyInfo.companyFirstRoundDescrip}</span>
            </Typography>
            <Typography
              variant="h4"
              color={colors.primary[100]}
              style={{ marginTop: "10px" }}
            >
              <span style={{ fontWeight: "bold" }}>Second Round:</span>
              <span>{companyInfo.companySecondRoundName}</span>
            </Typography>
            <Typography
              variant="h5"
              color={colors.primary[100]}
              style={{ marginTop: "5px" }}
            >
              <span style={{ marginLeft: "8px", fontStyle: "italic" }}>
                Description:
              </span>
              <span>{companyInfo.companySecondRoundDescrip}</span>
            </Typography>

            <Typography
              variant="h4"
              color={colors.primary[100]}
              style={{ marginTop: "10px" }}
            >
              <span style={{ fontWeight: "bold" }}>Third Round:</span>
              <span>{companyInfo.companyThirdRoundName}</span>
            </Typography>
            <Typography
              variant="h5"
              color={colors.primary[100]}
              style={{ marginTop: "10px" }}
            >
              <span style={{ marginLeft: "8px", fontStyle: "italic" }}>
                Description:
              </span>
              <span>{companyInfo.companyThirdRoundDescrip}</span>
            </Typography>
            <Typography
              variant="h4"
              color={colors.primary[100]}
              style={{ marginTop: "10px" }}
            >
              <span style={{ fontWeight: "bold" }}>Fourth Round:</span>
              <span>{companyInfo.companyFourthRoundName}</span>
            </Typography>
            <Typography
              variant="h5"
              color={colors.primary[100]}
              style={{ marginTop: "5px" }}
            >
              <span style={{ marginLeft: "8px", fontStyle: "italic" }}>
                Description:
              </span>
              <span>{companyInfo.companyFourthRoundDescrip}</span>
            </Typography>
            <Typography
              variant="h5"
              color={colors.primary[100]}
              style={{ marginTop: "5px" }}
            >
              <span style={{ fontStyle: "italic" }}>
                Additional Round Description:
              </span>
              <span>{companyInfo.companyAdditionalRoundDescrip}</span>
            </Typography>
          </Grid>
          <Divider />
          <Grid style={{ marginBottom: "20px" }}>
            <Typography variant="h3" color={colors.primary[100]}>
              Report Information:
            </Typography>

            <Typography
              variant="h5"
              color={colors.primary[100]}
              style={{ marginTop: "10px" }}
            >
              {`Approval Status: ${companyInfo.companyReportApprovalStatus}`}
            </Typography>

            <Typography
              variant="h5"
              color={colors.primary[100]}
              style={{ marginTop: "10px" }}
            >
              {`Practice Details: ${companyInfo.companyPracticeDetails}`}
            </Typography>

            <Typography
              variant="h5"
              color={colors.primary[100]}
              style={{ marginTop: "10px" }}
            >
              {`Report Added Date: ${companyInfo.companyReportAddDate}`}
            </Typography>

            <Typography
              variant="h5"
              color={colors.primary[100]}
              style={{ marginTop: "10px" }}
            >
              {`Report Added By: ${companyInfo.companyReportAddedBy}`}
            </Typography>

            <Typography
              variant="h5"
              color={colors.primary[100]}
              style={{ marginTop: "10px" }}
            >
              {`Report Year: ${companyInfo.companyReportYear}`}
            </Typography>
          </Grid>
          <Divider />
          <Grid style={{ marginBottom: "20px" }}>
            <Typography variant="h5" color={colors.primary[100]}>
              Report Feedback: {companyInfo.reportFeedBack}
            </Typography>
          </Grid>
          <Divider />
        </Box>
        <CompanyInformationModal
          open={openModal}
          handleClose={handleCloseModal}
          reportId={id}
        />
      </Container>
    </>
  );
};
export default ReportPage;
