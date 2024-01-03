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

// Define the form component
const CompanyForm = () => {
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
    companyReportApprovalStatus: "",
    companyPracticeDetails: "",
    companyReportAddDate: "",
    companyReportAddedBy: "",
    companyReportYear: "",
    reportFeedBack: "",
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required("Company Name is required"),
    companyNumOfRounds: Yup.string().required("Number of Rounds is required"),
    companyCTC: Yup.string().required("CTC is required"),
    companyEligibility: Yup.string().required("Eligibility is required"),
    companyJOBProfile: Yup.string().required("Job Profile is required"),
    companyFirstRoundName: Yup.string().required(
      "First Round Name is required"
    ),
    companyFirstRoundDescrip: Yup.string().required(
      "First Round Description is required"
    ),
    companyFirstRoundDuration: Yup.string().required(
      "First Round Duration is required"
    ),
    companySecondRoundName: Yup.string().required(
      "Second Round Name is required"
    ),
    companySecondRoundDescrip: Yup.string().required(
      "Second Round Description is required"
    ),
    companySecondRoundDuration: Yup.string().required(
      "Second Round Duration is required"
    ),
    companyThirdRoundName: Yup.string().required(
      "Third Round Name is required"
    ),
    companyThirdRoundDescrip: Yup.string().required(
      "Third Round Description is required"
    ),
    companyThirdRoundDuration: Yup.string().required(
      "Third Round Duration is required"
    ),
    companyFourthRoundName: Yup.string().required(
      "Fourth Round Name is required"
    ),
    companyFourthRoundDescrip: Yup.string().required(
      "Fourth Round Description is required"
    ),
    companyFourthRoundDuration: Yup.string().required(
      "Fourth Round Duration is required"
    ),
    companyAdditionalRoundDescrip: Yup.string(),
    companyReportApprovalStatus: Yup.string(),
    companyPracticeDetails: Yup.string(),
    companyReportAddDate: Yup.string(),
    companyReportAddedBy: Yup.string(),
    companyReportYear: Yup.string(),
    reportFeedBack: Yup.string(),
  }); 
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box mx="20vw" my="10vw">
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
                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
              }}
            >
              <TextField
                label="Company Name"
                variant="filled"
                id="companyName"
                name="companyName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyName}
                error={
                  touched.companyName &&
                  Boolean(errors.companyName)
                }
                helperText={
                  touched.companyName && errors.companyName
                }
                fullWidth
                margin="normal"
                sx={{ gridColumn: "span 2" }}
              />

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
                  touched.companyNumOfRounds &&
                  errors.companyNumOfRounds
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
                error={
                  touched.companyCTC && Boolean(errors.companyCTC)
                }
                helperText={
                  touched.companyCTC && errors.companyCTC
                }
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
                  touched.companyEligibility &&
                  errors.companyEligibility
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
                  touched.companyJOBProfile &&
                  Boolean(errors.companyJOBProfile)
                }
                helperText={
                  touched.companyJOBProfile &&
                  errors.companyJOBProfile
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
                  touched.companyFirstRoundName &&
                  errors.companyFirstRoundName
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
                  touched.companyThirdRoundName &&
                  errors.companyThirdRoundName
                }
                fullWidth
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
                margin="normal"
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                label="Report Add Date"
                variant="filled"
                id="companyReportAddDate"
                name="companyReportAddDate"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyReportAddDate}
                error={
                  touched.companyReportAddDate &&
                  Boolean(errors.companyReportAddDate)
                }
                helperText={
                  touched.companyReportAddDate &&
                  errors.companyReportAddDate
                }
                fullWidth
                margin="normal"
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                label="Report Added By"
                variant="filled"
                id="companyReportAddedBy"
                name="companyReportAddedBy"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyReportAddedBy}
                error={
                  touched.companyReportAddedBy &&
                  Boolean(errors.companyReportAddedBy)
                }
                helperText={
                  touched.companyReportAddedBy &&
                  errors.companyReportAddedBy
                }
                fullWidth
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
                  touched.companyReportYear &&
                  Boolean(errors.companyReportYear)
                }
                helperText={
                  touched.companyReportYear &&
                  errors.companyReportYear
                }
                fullWidth
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
                error={
                  touched.reportFeedBack &&
                  Boolean(errors.reportFeedBack)
                }
                helperText={
                  touched.reportFeedBack && errors.reportFeedBack
                }
                fullWidth
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
