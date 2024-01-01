import React, { useState } from "react";
import emailIcon from "../img/email.svg";
import passwordIcon from "../img/password.svg";
import styles from "./SignUp.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toast";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const Navigate = useNavigate();
  const [touched, setTouched] = useState({});

  const chaeckData = (obj) => {
    const urlApi = `http://localhost:5000/api/v1/user/login`;
    const api = axios
      .post(urlApi, obj)
      .then((data) => {
        if (data) {
          notify("You login to your account successfully", "success");

          localStorage.setItem("token", data.data.token);
          localStorage.setItem("name", data.data.User.name);
          localStorage.setItem("User_Id", data.data.User.Object_id);
          setData({
            email: "",
            password: "",
          });
          setTimeout(() => {
            window.location.replace("/event");
            console.log("yash varshney");
          }, 2000);
        } else notify("Your password or your email is wrong", "error");
      })
      .catch((error) => {
        console.log(error);
        notify(error.response.data.msg, "error");
      });
    toast.promise(api, {
      success: false,
      error: "Something went wrong!",
    });
  };

  const changeHandler = (event) => {
    if (event.target.name === "IsAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    chaeckData(data);
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.formLogin}
        onSubmit={submitHandler}
        autoComplete="off"
      >
        <h2>Sign In</h2>
        <div>
          <div>
            <input
              type="text"
              name="email"
              value={data.email}
              placeholder="E-mail"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            <img src={emailIcon} alt="" />
          </div>
        </div>
        <div>
          <div>
            <input
              type="password"
              name="password"
              value={data.password}
              placeholder="Password"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            <img src={passwordIcon} alt="" />
          </div>
        </div>

        <div>
          <button type="submit">Login</button>
          <span
            style={{
              color: "#a29494",
              textAlign: "center",
              display: "inline-block",
              width: "100%",
            }}
          >
            Don't have a account? <Link to="/signup">Create account</Link>
          </span>
        </div>
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Login;
