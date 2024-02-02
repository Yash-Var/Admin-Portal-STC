import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  MenuItem,
  Select,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";

// Define the form component
const CompanyForm = () => {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      const headers = {
        Authorization: `Bearer ${token}`, // Set the Authorization header with the token
      };

      const response = await axios.get(
        "http://localhost:5000/api/admin/getCompanyNames",
        { headers }
      );

      // Store the company names into an array
      const companyNames = response.data.data;

      // Sort the companyNames array by companyName
      companyNames.sort((a, b) => a.companyName.localeCompare(b.companyName));

      setCompanies(companyNames);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };
  const isNonMobile = useMediaQuery("(min-width:600px,)");
  const initialValues = {
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
    companyPracticeDetails: "",
    companyReportYear: "",
    reportFeedBack: "",
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required("Company Name is required"),
  });
  const onSubmit = async (values, { resetForm }) => {
    try {
      const token = localStorage.getItem("token"); // Replace with your actual token
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const newValues = {
        ...values,
        companyReportAddedBy: localStorage.getItem("userId"),
      };

      const response = await axios.post(
        "http://localhost:5000/api/admin/addCompanyData",
        newValues,
        { headers }
      );
      console.log(response.data);
      alert("Company Report Added Successfully");
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box mx="20vw" my="5vw">
      <Header
        title="ADD COMPANY DESCRIPTION"
        subtitle="Add a New Company Description"
      />
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <FormControl fullWidth variant="filled">
                <InputLabel id="company-name-label">Company Name</InputLabel>
                <Select
                  labelId="company-name-label"
                  id="companyName"
                  name="companyName"
                  value={values.companyName || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.companyName && !!errors.companyName}
                  label="Company Name"
                >
                  {companies.map((name) => (
                    <MenuItem key={name.companyID} value={name.companyID}>
                      {name.companyName}
                    </MenuItem>
                  ))}
                </Select>
                {touched.companyName && errors.companyName && (
                  <FormHelperText>{errors.companyName}</FormHelperText>
                )}
              </FormControl>
              <TextField
                label="Number of Rounds"
                variant="filled"
                id="companyNumOfRounds"
                name="companyNumOfRounds"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyNumOfRounds}
                error={
                  touched.companyNumOfRounds &&
                  Boolean(errors.companyNumOfRounds)
                }
                helperText={
                  touched.companyNumOfRounds && errors.companyNumOfRounds
                }
                fullWidth
                margin="normal"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                label="CTC"
                variant="filled"
                id="companyCTC"
                name="companyCTC"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyCTC}
                error={touched.companyCTC && Boolean(errors.companyCTC)}
                helperText={touched.companyCTC && errors.companyCTC}
                fullWidth
                margin="normal"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                label="Eligibility"
                variant="filled"
                id="companyEligibility"
                name="companyEligibility"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyEligibility}
                error={
                  touched.companyEligibility &&
                  Boolean(errors.companyEligibility)
                }
                helperText={
                  touched.companyEligibility && errors.companyEligibility
                }
                fullWidth
                margin="normal"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                label="Job Profile"
                variant="filled"
                id="companyJOBProfile"
                name="companyJOBProfile"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyJOBProfile}
                error={
                  touched.companyJOBProfile && Boolean(errors.companyJOBProfile)
                }
                helperText={
                  touched.companyJOBProfile && errors.companyJOBProfile
                }
                fullWidth
                margin="normal"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                label="First Round Name"
                variant="filled"
                id="companyFirstRoundName"
                name="companyFirstRoundName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyFirstRoundName}
                error={
                  touched.companyFirstRoundName &&
                  Boolean(errors.companyFirstRoundName)
                }
                helperText={
                  touched.companyFirstRoundName && errors.companyFirstRoundName
                }
                fullWidth
                margin="normal"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                label="First Round Description"
                variant="filled"
                id="companyFirstRoundDescrip"
                name="companyFirstRoundDescrip"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyFirstRoundDescrip}
                error={
                  touched.companyFirstRoundDescrip &&
                  Boolean(errors.companyFirstRoundDescrip)
                }
                helperText={
                  touched.companyFirstRoundDescrip &&
                  errors.companyFirstRoundDescrip
                }
                fullWidth
                multiline
                minRows={1}
                maxRows={5}
                margin="normal"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                label="First Round Duration"
                variant="filled"
                id="companyFirstRoundDuration"
                name="companyFirstRoundDuration"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyFirstRoundDuration}
                error={
                  touched.companyFirstRoundDuration &&
                  Boolean(errors.companyFirstRoundDuration)
                }
                helperText={
                  touched.companyFirstRoundDuration &&
                  errors.companyFirstRoundDuration
                }
                fullWidth
                margin="normal"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                label="Second Round Name"
                variant="filled"
                id="companySecondRoundName"
                name="companySecondRoundName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companySecondRoundName}
                error={
                  touched.companySecondRoundName &&
                  Boolean(errors.companySecondRoundName)
                }
                helperText={
                  touched.companySecondRoundName &&
                  errors.companySecondRoundName
                }
                multiline
                minRows={1}
                maxRows={5}
                fullWidth
                margin="normal"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                label="Second Round Description"
                variant="filled"
                id="companySecondRoundDescrip"
                name="companySecondRoundDescrip"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companySecondRoundDescrip}
                error={
                  touched.companySecondRoundDescrip &&
                  Boolean(errors.companySecondRoundDescrip)
                }
                helperText={
                  touched.companySecondRoundDescrip &&
                  errors.companySecondRoundDescrip
                }
                multiline
                minRows={1}
                maxRows={5}
                fullWidth
                margin="normal"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                label="Second Round Duration"
                variant="filled"
                id="companySecondRoundDuration"
                name="companySecondRoundDuration"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companySecondRoundDuration}
                error={
                  touched.companySecondRoundDuration &&
                  Boolean(errors.companySecondRoundDuration)
                }
                helperText={
                  touched.companySecondRoundDuration &&
                  errors.companySecondRoundDuration
                }
                fullWidth
                multiline
                minRows={1}
                maxRows={5}
                margin="normal"
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                label="Third Round Name"
                variant="filled"
                id="companyThirdRoundName"
                name="companyThirdRoundName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyThirdRoundName}
                error={
                  touched.companyThirdRoundName &&
                  Boolean(errors.companyThirdRoundName)
                }
                helperText={
                  touched.companyThirdRoundName && errors.companyThirdRoundName
                }
                fullWidth
                multiline
                minRows={1}
                maxRows={5}
                margin="normal"
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                label="Third Round Description"
                variant="filled"
                id="companyThirdRoundDescrip"
                name="companyThirdRoundDescrip"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyThirdRoundDescrip}
                error={
                  touched.companyThirdRoundDescrip &&
                  Boolean(errors.companyThirdRoundDescrip)
                }
                helperText={
                  touched.companyThirdRoundDescrip &&
                  errors.companyThirdRoundDescrip
                }
                fullWidth
                multiline
                minRows={1}
                maxRows={5}
                margin="normal"
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                label="Third Round Duration"
                variant="filled"
                id="companyThirdRoundDuration"
                name="companyThirdRoundDuration"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyThirdRoundDuration}
                error={
                  touched.companyThirdRoundDuration &&
                  Boolean(errors.companyThirdRoundDuration)
                }
                helperText={
                  touched.companyThirdRoundDuration &&
                  errors.companyThirdRoundDuration
                }
                fullWidth
                multiline
                minRows={1}
                maxRows={5}
                margin="normal"
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                label="Fourth Round Name"
                variant="filled"
                id="companyFourthRoundName"
                name="companyFourthRoundName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyFourthRoundName}
                error={
                  touched.companyFourthRoundName &&
                  Boolean(errors.companyFourthRoundName)
                }
                helperText={
                  touched.companyFourthRoundName &&
                  errors.companyFourthRoundName
                }
                fullWidth
                multiline
                minRows={1}
                maxRows={5}
                margin="normal"
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                label="Fourth Round Description"
                variant="filled"
                id="companyFourthRoundDescrip"
                name="companyFourthRoundDescrip"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyFourthRoundDescrip}
                error={
                  touched.companyFourthRoundDescrip &&
                  Boolean(errors.companyFourthRoundDescrip)
                }
                helperText={
                  touched.companyFourthRoundDescrip &&
                  errors.companyFourthRoundDescrip
                }
                fullWidth
                multiline
                minRows={1}
                maxRows={5}
                margin="normal"
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                label="Fourth Round Duration"
                variant="filled"
                id="companyFourthRoundDuration"
                name="companyFourthRoundDuration"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyFourthRoundDuration}
                error={
                  touched.companyFourthRoundDuration &&
                  Boolean(errors.companyFourthRoundDuration)
                }
                helperText={
                  touched.companyFourthRoundDuration &&
                  errors.companyFourthRoundDuration
                }
                fullWidth
                multiline
                minRows={1}
                maxRows={5}
                margin="normal"
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                label="Additional Round Description"
                variant="filled"
                id="companyAdditionalRoundDescrip"
                name="companyAdditionalRoundDescrip"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyAdditionalRoundDescrip}
                error={
                  touched.companyAdditionalRoundDescrip &&
                  Boolean(errors.companyAdditionalRoundDescrip)
                }
                helperText={
                  touched.companyAdditionalRoundDescrip &&
                  errors.companyAdditionalRoundDescrip
                }
                fullWidth
                multiline
                minRows={1}
                maxRows={5}
                margin="normal"
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                label="Report Approval Status"
                variant="filled"
                id="companyReportApprovalStatus"
                name="companyReportApprovalStatus"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyReportApprovalStatus}
                error={
                  touched.companyReportApprovalStatus &&
                  Boolean(errors.companyReportApprovalStatus)
                }
                helperText={
                  touched.companyReportApprovalStatus &&
                  errors.companyReportApprovalStatus
                }
                fullWidth
                multiline
                minRows={1}
                maxRows={5}
                margin="normal"
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                label="Practice Details"
                variant="filled"
                id="companyPracticeDetails"
                name="companyPracticeDetails"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyPracticeDetails}
                error={
                  touched.companyPracticeDetails &&
                  Boolean(errors.companyPracticeDetails)
                }
                helperText={
                  touched.companyPracticeDetails &&
                  errors.companyPracticeDetails
                }
                fullWidth
                multiline
                minRows={1}
                maxRows={5}
                margin="normal"
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                label="Report Year"
                variant="filled"
                id="companyReportYear"
                name="companyReportYear"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyReportYear}
                error={
                  touched.companyReportYear && Boolean(errors.companyReportYear)
                }
                helperText={
                  touched.companyReportYear && errors.companyReportYear
                }
                fullWidth
                multiline
                minRows={1}
                maxRows={5}
                margin="normal"
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                label="Report Feedback"
                variant="filled"
                id="reportFeedBack"
                name="reportFeedBack"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.reportFeedBack}
                error={touched.reportFeedBack && Boolean(errors.reportFeedBack)}
                helperText={touched.reportFeedBack && errors.reportFeedBack}
                fullWidth
                multiline
                minRows={1}
                maxRows={5}
                margin="normal"
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" my="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add Company Description
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CompanyForm;
