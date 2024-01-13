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
          <Container key={index} maxWidth="sm">
            <Paper elevation={3} className={classes.paper}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h4" color={colors.primary}>
                  {companyInfo.companyName}
                </Typography>
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
          </Container>
        );
      })}
    </>
  );
};

export default CompanyInformation;
