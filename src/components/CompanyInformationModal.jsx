import React, { useState, useEffect } from "react";
import {
  Modal,
  TextField,
  Box,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";

const CompanyInformationModal = ({ open, handleClose, companyId }) => {
  const [companyData, setCompanyData] = useState({
    companyName: "",
    companyNumOfRounds: "",
    companyCTC: "",
    companyEligibility: "",
    companyJOBProfile: "",
    companyFirstRoundName: "",
    companyFirstRoundDescrip: "",
    companyFirstRoundDuration: "",
    companySecondRoundName: "",
    companySecondRoundDescrip: "",
    companySecondRoundDuration: "",
    companyThirdRoundName: "",
    companyThirdRoundDescrip: "",
    companyThirdRoundDuration: "",
    companyFourthRoundName: "",
    companyFourthRoundDescrip: "",
    companyFourthRoundDuration: "",
    companyAdditionalRoundDescrip: "",
    companyReportApprovalStatus: "",
    companyPracticeDetails: "",
    companyReportAddDate: "",
    companyReportAddedBy: "",
    companyReportYear: "",
    reportFeedBack: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/getCompanyData/${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data.data[0]);
        console.log("temp");
        setCompanyData({
          companyEstablishment:
            response.data.data[0].companyEstablishment || "",
          companyName: response.data.data[0].companyName || "",
          companyNumOfRounds: response.data.data[0].companyNumOfRounds || "",
          companyCTC: response.data.data[0].companyCTC || "",
          companyEligibility: response.data.data[0].companyEligibility || "",
          companyJOBProfile: response.data.data[0].companyJOBProfile || "",
          companyFirstRoundName:
            response.data.data[0].companyFirstRoundName || "",
          companyFirstRoundDescrip:
            response.data.data[0].companyFirstRoundDescrip || "",
          companyFirstRoundDuration:
            response.data.data[0].companyFirstRoundDuration || "",
          companySecondRoundName:
            response.data.data[0].companySecondRoundName || "",
          companySecondRoundDescrip:
            response.data.data[0].companySecondRoundDescrip || "",
          companySecondRoundDuration:
            response.data.data[0].companySecondRoundDuration || "",
          companyThirdRoundName:
            response.data.data[0].companyThirdRoundName || "",
          companyThirdRoundDescrip:
            response.data.data[0].companyThirdRoundDescrip || "",
          companyThirdRoundDuration:
            response.data.data[0].companyThirdRoundDuration || "",
          companyFourthRoundName:
            response.data.data[0].companyFourthRoundName || "",
          companyFourthRoundDescrip:
            response.data.data[0].companyFourthRoundDescrip || "",
          companyFourthRoundDuration:
            response.data.data[0].companyFourthRoundDuration || "",
          companyAdditionalRoundDescrip:
            response.data.data[0].companyAdditionalRoundDescrip || "",
          companyReportApprovalStatus:
            response.data.data[0].companyReportApprovalStatus || "",
          companyPracticeDetails:
            response.data.data[0].companyPracticeDetails || "",
          companyReportAddDate:
            response.data.data[0].companyReportAddDate || "",
          companyReportAddedBy:
            response.data.data[0].companyReportAddedBy || "",
          companyReportYear: response.data.data[0].companyReportYear || "",
          reportFeedBack: response.data.data[0].reportFeedBack || "",
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [companyId]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCompanyData({
      ...companyData,
      [name]: value,
    });
  };
  const handleSave = async () => {
    console.log(companyData);
    try {
      // Perform action to save data (e.g., send updated data to an API)
      // Example: Axios PUT request to update company details
    //   await axios.post(
    //     `http://localhost:5000/api/admin/updateCompany/${companyId}`,
    //     companyData,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
        console.log(companyData);
      handleClose();
    } catch (error) {
      console.error("Error while saving data:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%", // Adjust width percentage as needed
          maxWidth: 500, // Set a maximum width if required
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflow: "auto",
          height: "80%", // Adjust height percentage as needed
        }}
      >
        <Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              size="small"
              variant="outlined"
              value={companyData.companyName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Number of Rounds"
              name="companyNumOfRounds"
              size="small"
              variant="outlined"
              value={companyData.companyNumOfRounds}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Company CTC"
              name="companyCTC"
              size="small"
              variant="outlined"
              value={companyData.companyCTC}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Eligibility"
              name="companyEligibility"
              size="small"
              variant="outlined"
              value={companyData.companyEligibility}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Job Profile"
              name="companyJOBProfile"
              size="small"
              variant="outlined"
              value={companyData.companyJOBProfile}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="First Round Name"
              name="companyFirstRoundName"
              size="small"
              variant="outlined"
              value={companyData.companyFirstRoundName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="First Round Description"
              name="companyFirstRoundDescrip"
              size="small"
              variant="outlined"
              value={companyData.companyFirstRoundDescrip}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="First Round Duration"
              name="companyFirstRoundDuration"
              size="small"
              variant="outlined"
              value={companyData.companyFirstRoundDuration}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Second Round Name"
              name="companySecondRoundName"
              size="small"
              variant="outlined"
              value={companyData.companySecondRoundName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Second Round Description"
              name="companySecondRoundDescrip"
              size="small"
              variant="outlined"
              value={companyData.companySecondRoundDescrip}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Second Round Duration"
              name="companySecondRoundDuration"
              size="small"
              variant="outlined"
              value={companyData.companySecondRoundDuration}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Third Round Name"
              name="companyThirdRoundName"
              size="small"
              variant="outlined"
              value={companyData.companyThirdRoundName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Third Round Description"
              name="companyThirdRoundDescrip"
              size="small"
              variant="outlined"
              value={companyData.companyThirdRoundDescrip}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Third Round Duration"
              name="companyThirdRoundDuration"
              size="small"
              variant="outlined"
              value={companyData.companyThirdRoundDuration}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Fourth Round Name"
              name="companyFourthRoundName"
              size="small"
              variant="outlined"
              value={companyData.companyFourthRoundName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Fourth Round Description"
              name="companyFourthRoundDescrip"
              size="small"
              variant="outlined"
              value={companyData.companyFourthRoundDescrip}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Fourth Round Duration"
              name="companyFourthRoundDuration"
              size="small"
              variant="outlined"
              value={companyData.companyFourthRoundDuration}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Additional Round Description"
              name="companyAdditionalRoundDescrip"
              size="small"
              variant="outlined"
              value={companyData.companyAdditionalRoundDescrip}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Report Approval Status"
              name="companyReportApprovalStatus"
              size="small"
              variant="outlined"
              value={companyData.companyReportApprovalStatus}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Practice Details"
              name="companyPracticeDetails"
              size="small"
              variant="outlined"
              value={companyData.companyPracticeDetails}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Report Add Date"
              name="companyReportAddDate"
              size="small"
              variant="outlined"
              value={companyData.companyReportAddDate}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Report Added By"
              name="companyReportAddedBy"
              size="small"
              variant="outlined"
              value={companyData.companyReportAddedBy}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Report Year"
              name="companyReportYear"
              size="small"
              variant="outlined"
              value={companyData.companyReportYear}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Report Feedback"
              name="reportFeedBack"
              size="small"
              variant="outlined"
              value={companyData.reportFeedBack}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Grid>
          <Grid item xs={12} my={2}>
            <Button
              color="primary"
              fullWidth
              variant="contained"
              onClick={handleSave}
            >
              Save
            </Button>
          </Grid>

          <Grid item xs={12} my={2}>
            <Button
              color="primary"
              fullWidth
              variant="contained"
              onClick={handleClose}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CompanyInformationModal;