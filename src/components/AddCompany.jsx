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
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import axios from "axios";
import { useState, useEffect } from "react";

const CompanyForm = () => {
  const [companyType, setCompanyType] = useState([]);
  useEffect(() => {
    fetchCompanyType();
  }, []);
  const fetchCompanyType = async () => {
    try {
      const response = await axios.get(
        `${process.env.React_App_BASE_URL}/api/admin/getClasses`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.data);
      console.log("company tyoe");
      setCompanyType(response.data.data);
    } catch (error) {
      console.error("company type error");
      console.error(error);
    }
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      console.log(values);
      const response = await axios.post(
        `${process.env.React_App_BASE_URL}/api/admin/addCompany`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      alert("Company Added Successfully");
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const companySchema = yup.object().shape({
    companyName: yup.string().required("Company Name is required"),
    companyClass: yup.number().required("Company Class is required"),
    companyDescription: yup
      .string()
      .required("Company Description is required"),
    companyEstablishment: yup
      .string()
      .required("Establishment Year is required"),
    companyWebsite: yup.string().required("Company Website is required"),
    companyAddedBy: yup.string().required("Added By is required"),
  });

  const initialValues = {
    companyName: "",
    companyClass: "",
    companyDescription: "",
    companyEstablishment: "",
    companyWebsite: "",
    companyAddedBy: localStorage.getItem("userId"),
  };

  return (
    <Box mx="20vw" my="7vw">
      <Header title="ADD COMPANY" subtitle="Add a New Company" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={companySchema}
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Company Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyName}
                name="companyName"
                error={!!touched.companyName && !!errors.companyName}
                helperText={touched.companyName && errors.companyName}
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                  labelId="type-label"
                  id="companyClass"
                  name="companyClass"
                  value={values.companyClass || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.companyClass && !!errors.companyClass}
                  label="Company Class"
                >
                  {companyType?.map((type) => (
                    <MenuItem key={type.classID} value={type.classID}>
                      {type.className}
                    </MenuItem>
                  ))}
                </Select>
                {touched.companyClass && errors.companyClass && (
                  <FormHelperText>{errors.companyClass}</FormHelperText>
                )}
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Company Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyDescription}
                name="companyDescription"
                error={
                  !!touched.companyDescription && !!errors.companyDescription
                }
                helperText={
                  touched.companyDescription && errors.companyDescription
                }
                sx={{ gridColumn: "span 4" }}
                multiline
                minRows={1}
                maxRows={5}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Company Website"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyWebsite}
                name="companyWebsite"
                error={!!touched.companyWebsite && !!errors.companyWebsite}
                helperText={touched.companyWebsite && errors.companyWebsite}
                sx={{ gridColumn: "span 4" }}
                multiline
                minRows={1}
                maxRows={5}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Establishment Year"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyEstablishment}
                name="companyEstablishment"
                error={
                  !!touched.companyEstablishment &&
                  !!errors.companyEstablishment
                }
                helperText={
                  touched.companyEstablishment && errors.companyEstablishment
                }
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add Company
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CompanyForm;
