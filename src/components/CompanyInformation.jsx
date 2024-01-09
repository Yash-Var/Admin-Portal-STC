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
import CompanyInformationModal from "./CompanyInformationModal";

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
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this company?"
      );
      if (confirmDelete) {
        // await axios.get(
        //   `http://localhost:5000/api/admin/deleteCompanyData/${id}`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem("token")}`,
        //       "Content-Type": "application/json",
        //     },
        //   }
        // );
        // fetchData();
      } else {
        console.error("Deletion cancelled by user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    fetchData();
    setOpenModal(false);
  };

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
      setCompanyData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

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
                <Box display="flex" justifyContent="end" my="20px">
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
              companyId={id}
            />
          </Container>
        );
      })}
    </>
  );
};

export default CompanyInformation;
