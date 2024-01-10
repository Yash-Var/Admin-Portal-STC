import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import emailIcon from "../img/email.svg";
import passwordIcon from "../img/password.svg";
import styles from "./SignUp.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toast";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const Navigate = useNavigate();
  const [touched, setTouched] = useState({});

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const chaeckData = (obj) => {
    const urlApi = `http://localhost:5000/api/admin/loginAdmin`;
    const api = axios
      .post(urlApi, obj)
      .then((data) => {
        if (data) {
          console.log(data);
          notify("You login to your account successfully", "success");
          localStorage.setItem("token", data.data.access_token);
          localStorage.setItem("user", data.data.userType);
          localStorage.setItem("userId", data.data.userId);
          window.location.href = "/";
          notify("You login to your account successfully", "success");

          setData({
            email: "",
            password: "",
          });
        } else notify("Your password or your email is wrong", "error");
      })
      .catch((error) => {
        console.log(error);
        notify(error.response.data.message, "error");
      });
    toast.promise(api, {
      success: false,
      error: "Something went wrong!",
    });
  };

  const submitHandler = (values) => {
    chaeckData(values);
  };

  return (
    <Box
      mx="auto"
      my="20vh"
      width="30vw"
      minWidth="350px"
      p="20px"
      border="1px solid #ccc"
      borderRadius="8px"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.5)"
      textAlign="center"

    >
      <ToastContainer />
        <span
              style={{
                color: "#4cceac",
                textAlign: "center",
                display: "inline-block",
                width: "100%",
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Sign in to your account
            </span>
      <Formik
        initialValues={data}
        validationSchema={loginSchema}
        onSubmit={submitHandler}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} autoComplete="off">
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained" sx={{ width: "100%" }}>
                Login
            </Button>
            </Box>
            <span
              style={{
                color: "#a29494",
                textAlign: "center",
                display: "inline-block",
                width: "100%",
                marginTop: "20px",
              }}
            >
              Don't have an account?
            </span>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
