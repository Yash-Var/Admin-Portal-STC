import React, { useEffect, useState } from "react";
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
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import axios from "axios";

const QuestionForm = () => {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        "http://localhost:5000/api/admin/getCompanyNames",
        { headers }
      );

      const companyData = response.data.data;

      // companyData.sort((a, b) => a.companyName.localeCompare(b.companyName));
      companyData.sort((a, b) => {
        const companyNameA = a.companyName || ""; // Use empty string if null or undefined
        const companyNameB = b.companyName || "";
        return companyNameA.localeCompare(companyNameB);
      });

      setCompanies(companyData);
    } catch (error) {
      console.error(error);
    }
  };

  const isNonMobile = useMediaQuery("(min-width:600px,)");

  const initialValues = {
    companyId: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    questions: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required("Question is required"),
      })
    ),
  });

  const onSubmit = async (values, { resetForm }) => {
    const newValues = {
      ...values,
      company: companies.find(
        (company) => company.companyID === values.companyId
      ).companyName,
    };

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        "http://localhost:5000/api/admin/addQuestion",
        newValues,
        { headers }
      );

      console.log(response.data);

      if (response.status === 201) {
        alert("Questions Added Successfully");
        resetForm();
        window.location.reload();
      } else {
        // Handle other response statuses if needed
        console.error(`Failed to add questions. Status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box mx="20vw" my="5vw">
      <Header title="ADD QUESTIONS" subtitle="Add New Questions" />
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
                <InputLabel id="company-id-label">Company Name</InputLabel>
                <Select
                  labelId="company-id-label"
                  id="companyId"
                  name="Company Name"
                  value={values.companyId || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.companyId && !!errors.companyId}
                  label="Company ID"
                >
                  {companies.map((company) => (
                    <MenuItem key={company.companyID} value={company.companyID}>
                      {company.companyName}
                    </MenuItem>
                  ))}
                </Select>
                {touched.companyId && errors.companyId && (
                  <FormHelperText>{errors.companyId}</FormHelperText>
                )}
              </FormControl>
            </Box>
            <FieldArray name="questions">
              {({ push, remove }) => (
                <Box>
                  {values.questions.map((question, index) => (
                    <Box key={index} mb={4}>
                      <TextField
                        fullWidth
                        variant="filled"
                        label={`Question ${index + 1}`}
                        name={`questions[${index}].question`}
                        value={question.question}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched.questions?.[index]?.question &&
                          !!errors.questions?.[index]?.question
                        }
                        helperText={
                          touched.questions?.[index]?.question &&
                          errors.questions?.[index]?.question
                        }
                        multiline
                        minRows={1}
                        maxRows={5}
                        style={{ marginTop: "1rem" }}
                      />
                      <Box mt={2}>
                        <TextField
                          fullWidth
                          variant="filled"
                          label="Option 1"
                          name={`questions[${index}].options[0]`}
                          value={question.options[0]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            !!touched.questions?.[index]?.options?.[0] &&
                            !!errors.questions?.[index]?.options?.[0]
                          }
                          helperText={
                            touched.questions?.[index]?.options?.[0] &&
                            errors.questions?.[index]?.options?.[0]
                          }
                          multiline
                          minRows={1}
                          maxRows={5}
                        />
                      </Box>
                      <Box mt={2}>
                        <TextField
                          fullWidth
                          variant="filled"
                          label="Option 2"
                          name={`questions[${index}].options[1]`}
                          value={question.options[1]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            !!touched.questions?.[index]?.options?.[1] &&
                            !!errors.questions?.[index]?.options?.[1]
                          }
                          helperText={
                            touched.questions?.[index]?.options?.[1] &&
                            errors.questions?.[index]?.options?.[1]
                          }
                          multiline
                          minRows={1}
                          maxRows={5}
                        />
                      </Box>
                      <Box mt={2}>
                        <TextField
                          fullWidth
                          variant="filled"
                          label="Option 3"
                          name={`questions[${index}].options[2]`}
                          value={question.options[2]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            !!touched.questions?.[index]?.options?.[2] &&
                            !!errors.questions?.[index]?.options?.[2]
                          }
                          helperText={
                            touched.questions?.[index]?.options?.[2] &&
                            errors.questions?.[index]?.options?.[2]
                          }
                          multiline
                          minRows={1}
                          maxRows={5}
                        />
                      </Box>
                      <Box mt={2}>
                        <TextField
                          fullWidth
                          variant="filled"
                          label="Option 4"
                          multiline
                          minRows={1}
                          maxRows={5}
                          name={`questions[${index}].options[3]`}
                          value={question.options[3]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            !!touched.questions?.[index]?.options?.[3] &&
                            !!errors.questions?.[index]?.options?.[3]
                          }
                          helperText={
                            touched.questions?.[index]?.options?.[3] &&
                            errors.questions?.[index]?.options?.[3]
                          }
                        />
                      </Box>

                      <Box
                        mt={2}
                        display="flex"
                        justifyContent="end"
                        gap="2rem"
                      >
                        <Button
                          type="button"
                          variant="contained"
                          color="error"
                          onClick={() => remove(index)}
                        >
                          Remove Question
                        </Button>
                        <Button
                          type="button"
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            push({
                              question: "",
                              options: ["", "", "", ""],
                            })
                          }
                          style={{ backgroundColor: "#4caf50" }}
                        >
                          Add Question
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </FieldArray>
            <Box display="flex" justifyContent="end" mt={4}>
              <Button type="submit" color="secondary" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default QuestionForm;
