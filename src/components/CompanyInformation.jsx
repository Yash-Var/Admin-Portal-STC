import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { tokens } from "../theme";
import { Box, Typography, useTheme, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
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

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  listItemText: {
    wordBreak: "break-word",
  },
}));

const CompanyInformation = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const classes = useStyles();
  const { id } = useParams();
  const [companyInfo, setCompanyData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/getCompanyData/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data.data;
      console.log(data.length);
      setCompanyData(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (companyInfo.length === 0) {
    return (
      <>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <div style={{ textAlign: "center" }}>
            <h1 style={{ color: "#2c3e50", fontSize: "2em", margin: "0" }}>
              No Reports Available
            </h1>
            <p style={{ color: "#7f8c8d", fontSize: "1.2em" }}>
              We regret to inform you that there are currently no reports
              available for the company.
            </p>
            <p style={{ color: "#7f8c8d", fontSize: "1.2em" }}>
              Please check back later or contact our support team for
              assistance.
            </p>
          </div>
        </Box>
      </>
    );
  }

  return (
    <>
      {companyInfo.map((companyInfo, index) => {
        return (
          <>
            <Container style={{ marginBottom: "30px" }}>
              <Box my="20px">
                <Box display="flex" justifyContent="space-between" mb="20px">
                  <Typography variant="h1" color={colors.primary[100]}>
                    {companyInfo.companyName}
                  </Typography>
                  <Typography variant="h2" color={colors.primary[100]}>
                    {"Report : " + (index + 1)}
                  </Typography>
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
            </Container>
          </>
        );
      })}
    </>
  );
};

export default CompanyInformation;
