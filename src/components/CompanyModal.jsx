import React, { useState, useEffect } from "react";
import {
  Modal,
  TextField,
  Box,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const CompanyModal = ({ open, handleClose, companyId }) => {
  const [companyData, setCompanyData] = useState({
    companyName: "",
    companyDescription: "",
    companyWebsite: "",
    establishmentyear: "",
    // companyType: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/getCompany/${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data.data[0]);
        setCompanyData({
          companyName: response.data.data[0].companyName,
          companyDescription: response.data.data[0].companyDescription,
          companyWebsite: response.data.data[0].companyWebsite,
          companyEstablishment: response.data.data[0].companyEstablishment,
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
      await axios.post(
        `http://localhost:5000/api/admin/updateCompany/${companyId}`,
        companyData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

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
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Description"
              name="companyDescription"
              size="small"
              variant="outlined"
              value={companyData.companyDescription}
              onChange={handleInputChange}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Website"
              name="companyWebsite"
              size="small"
              variant="outlined"
              value={companyData.companyWebsite}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Establishment Year"
              name="establishmentyear"
              size="small"
              variant="outlined"
              value={companyData.companyEstablishment}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="companyTypeLabel">Company Type</InputLabel>
              <Select
                labelId="companyTypeLabel"
                value={companyData.companyType || ""}
                onChange={(e) =>
                  handleInputChange("companyType", e.target.value)
                }
              >
                <MenuItem value="elite">Elite</MenuItem>
                <MenuItem value="major">Major</MenuItem>
                <MenuItem value="hero">Hero</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Type"
              name="companyType"
              size="small"
              variant="outlined"
              value={companyData.companyType}
              onChange={handleInputChange}
            />
          </Grid> */}
          <Grid item xs={12}>
            <Button
              color="primary"
              fullWidth
              variant="contained"
              onClick={handleSave}
            >
              Save
            </Button>
          </Grid>

          <Grid item xs={12}>
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

export default CompanyModal;
