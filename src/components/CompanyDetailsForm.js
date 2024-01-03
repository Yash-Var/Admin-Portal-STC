import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CompanyDetails = () => {
  const Navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    companyName:"",
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

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API request to submit form data
      const response = await axios.post(
        "http://localhost:5000/api/admin/addCompany", // Replace with your API endpoint
        formData,
        {
          headers: {
            Authorization: "Bearer " + "your_access_token_here",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Company added successfully:", response.data);
      // Optionally, navigate to another page after successful submission
      Navigate("/companies");
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  const theme = useTheme();

  return (
    <Box m="20px">
      <Box m="40px" maxWidth="auto">
        <Typography variant="h4" mb="20px">
          Add Company
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Add input fields for each form field */}
          <TextField
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
          <TextField
            label="Number of Rounds"
            name="companyNumOfRounds"
            value={formData.companyNumOfRounds}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="CTC"
            name="companyCTC"
            value={formData.companyCTC}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Eligibility"
            name="companyEligibility"
            value={formData.companyEligibility}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
            <TextField
            label="Job Profile"
            name="companyJOBProfile"
            value={formData.companyJOBProfile}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="First Round Name"
            name="companyFirstRoundName"
            value={formData.companyFirstRoundName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="First Round Description"
            name="companyFirstRoundDescrip"
            value={formData.companyFirstRoundDescrip}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="First Round Duration"
            name="companyFirstRoundDuration"
            value={formData.companyFirstRoundDuration}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <TextField

            label="Second Round Name"
            name="companySecondRoundName"
            value={formData.companySecondRoundName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Second Round Description"
            name="companySecondRoundDescrip"
            value={formData.companySecondRoundDescrip}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Second Round Duration"
            name="companySecondRoundDuration"
            value={formData.companySecondRoundDuration}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Third Round Name"
            name="companyThirdRoundName"
            value={formData.companyThirdRoundName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <TextField

            label="Third Round Description"
            name="companyThirdRoundDescrip"
            value={formData.companyThirdRoundDescrip}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Third Round Duration"
            name="companyThirdRoundDuration"
            value={formData.companyThirdRoundDuration}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Fourth Round Name"
            name="companyFourthRoundName"
            value={formData.companyFourthRoundName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Fourth Round Description"
            name="companyFourthRoundDescrip"

            value={formData.companyFourthRoundDescrip}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Fourth Round Duration"
            name="companyFourthRoundDuration"
            value={formData.companyFourthRoundDuration}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Additional Round Description"
            name="companyAdditionalRoundDescrip"
            value={formData.companyAdditionalRoundDescrip}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Report Approval Status"
            name="companyReportApprovalStatus"
            value={formData.companyReportApprovalStatus}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Practice Details"
            name="companyPracticeDetails"
            value={formData.companyPracticeDetails}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Report Add Date"
            name="companyReportAddDate"
            value={formData.companyReportAddDate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Report Added By"
            name="companyReportAddedBy"
            value={formData.companyReportAddedBy}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Report Year"
            name="companyReportYear"
            value={formData.companyReportYear}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Report Feedback"
            name="reportFeedBack"
            value={formData.reportFeedBack}

            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />

          {/* Add other input fields here... */}

          {/* Submit Button */}
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{ height: "40px", width: "120px", marginTop: "20px" }}
          >
            Add Company
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CompanyDetails;
