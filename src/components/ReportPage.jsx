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
  setPendingStatus,
} from "../utils/reportSlice";
import CompanyInformationModal from "./ReportEditModal";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  listItemText: {
    wordBreak: "break-word",
  },
}));

const ReportPage = ({ isPending }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const classes = useStyles();
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
      dispatch(setPendingStatus(true));

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
      <Container maxWidth="sm">
        <Paper elevation={3} className={classes.paper}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4" color={colors.primary}>
              {companyInfo.companyName}
            </Typography>
            <Box display="flex" justifyContent="end">
              {companyInfo.companyReportApprovalStatus ===
                "Pending Approval" && (
                <>
                  <Box my="20px" mr="5px">
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      onClick={() => handleStatus(true)}
                    >
                      <DoneOutlinedIcon />
                    </Button>
                  </Box>
                  <Box my="20px" mx="5px">
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      onClick={() => handleStatus(false)}
                    >
                      <CloseOutlinedIcon />
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
                  <Box display="flex" justifyContent="end" my="20px">
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
          <Grid container spacing={3} style={{ marginTop: "20px" }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">
                Company Name: {companyInfo.companyName}
              </Typography>
              <Typography variant="body1">
                Number of Rounds: {companyInfo.companyNumOfRounds}
              </Typography>
              <Typography variant="body1">
                CTC: {companyInfo.companyCTC}
              </Typography>
              <Typography variant="body1">
                Eligibility: {companyInfo.companyEligibility}
              </Typography>
              <Typography variant="body1">
                Job Profile: {companyInfo.companyJOBProfile}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Rounds Information:</Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={`First Round: ${companyInfo.companyFirstRoundName}`}
                    secondary={`Description: ${companyInfo.companyFirstRoundDescrip}`}
                    className={classes.listItemText}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Second Round: ${companyInfo.companySecondRoundName}`}
                    secondary={`Description: ${companyInfo.companySecondRoundDescrip}`}
                    className={classes.listItemText}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Third Round: ${companyInfo.companyThirdRoundName}`}
                    secondary={`Description: ${companyInfo.companyThirdRoundDescrip}`}
                    className={classes.listItemText}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Fourth Round: ${companyInfo.companyFourthRoundName}`}
                    secondary={`Description: ${companyInfo.companyFourthRoundDescrip}`}
                    className={classes.listItemText}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                Additional Round Description:{" "}
                {companyInfo.companyAdditionalRoundDescrip}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Report Information:</Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={`Approval Status: ${companyInfo.companyReportApprovalStatus}`}
                    className={classes.listItemText}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Practice Details: ${companyInfo.companyPracticeDetails}`}
                    className={classes.listItemText}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Report Added Date: ${companyInfo.companyReportAddDate}`}
                    className={classes.listItemText}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Report Added By: ${companyInfo.companyReportAddedBy}`}
                    className={classes.listItemText}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Report Year: ${companyInfo.companyReportYear}`}
                    className={classes.listItemText}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                Report Feedback: {companyInfo.reportFeedBack}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <CompanyInformationModal
          open={openModal}
          handleClose={handleCloseModal}
          reportId={id}
        />
      </Container>
      );
    </>
  );
};

export default ReportPage;
