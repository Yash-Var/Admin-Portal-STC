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

      companyData.sort((a, b) => a.companyName.localeCompare(b.companyName));

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
        options: [null, null, null, null],
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
        ...values,company: companies.find((company) => company.companyID === values.companyId).companyName};
        console.log(newValues);
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
      alert("Questions Added Successfully");
      resetForm();
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
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
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
                <InputLabel id="company-id-label">Company ID</InputLabel>
                <Select
                  labelId="company-id-label"
                  id="companyId"
                  name="companyId"
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
                <>
                  {values.questions.map((question, index) => (
                    <Box key={index} mb={4}>
                      <TextField
                        label="Question"
                        variant="filled"
                        id={`question-${index}`}
                        name={`questions[${index}].question`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={question.question}
                        error={touched.questions?.[index]?.question && Boolean(errors.questions?.[index]?.question)}
                        helperText={touched.questions?.[index]?.question && errors.questions?.[index]?.question}
                        fullWidth
                        margin="normal"
                      />
                      {question.options.map((option, optionIndex) => (
                        <TextField
                          key={optionIndex}
                          label={`Option ${optionIndex + 1}`}
                          variant="filled"
                          id={`option-${index}-${optionIndex}`}
                          name={`questions[${index}].options[${optionIndex}]`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={option}
                          error={touched.questions?.[index]?.options?.[optionIndex] && Boolean(errors.questions?.[index]?.options?.[optionIndex])}
                          helperText={touched.questions?.[index]?.options?.[optionIndex] && errors.questions?.[index]?.options?.[optionIndex]}
                          fullWidth
                          margin="normal"
                        />
                      ))}
                      <Box mt={2}>
                        <Button
                          type="button"
                          variant="contained"
                          color="error"
                          onClick={() => remove(index)}
                        >
                          Remove Question
                        </Button>
                      </Box>
                    </Box>
                  ))}
                  <Box display="flex" justifyContent="end" mt={4}>
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={() => push({
                        question: "",
                        options: ["", "", "", ""],
                      })}
                    >
                      Add Question
                    </Button>
                  </Box>
                </>
              )}
            </FieldArray>
            <Box display="flex" justifyContent="end" mt={4}>
              <Button type="submit" color="secondary" variant="contained">
                Add Questions
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default QuestionForm;
