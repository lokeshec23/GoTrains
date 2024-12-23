import { useState } from "react";
// import User from "../assets/images/Register/User.svg";
import Mail from "../assets/images/Register/Mail.svg";
import Lock from "../assets/images/Register/lock.svg";
import LoginWith from "../assets/images/Register/LoginWith.svg";
import Fackbook from "../assets/images/Register/Fackbook_2.svg";
import Google from "../assets/images/Register/Google.svg";
import EyeClose from "../assets/images/Register/eye-close.svg";
import EyeOpen from "../assets/images/Register/eye-open.svg";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import HelperText from "../utils/HelperText";
import { loginUser } from "../services/loginService";
import useApi from "../hooks/useApi";
import { showToast } from "../utils/toast";

// import X from "../assets/images/Register/X.svg";
// import Apple from "../assets/images/Register/Apple.svg";

const Login = () => {
  const { loading, error: errorAPi, callApi } = useApi();
  const [userInfo, setUserInfo] = useState({
    // username: "",
    email: "",
    password: "",
    // confirmPassword: "",
  });
  const [error, setError] = useState({});
  const [eyeChange, setEyeChange] = useState({
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/booking");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError((prev) => ({
      ...prev,
      [name]: {
        type: "",
        isError: false,
        errorMessage: "",
      },
    }));
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const create_Account_function = async () => {
    try {
      // Step 1: Check form validation
      const isVerified = await check_form_validation();
      if (!isVerified) return;

      // Step 2: Call API to log in the user
      const response = await callApi(() => loginUser(userInfo));

      // Step 3: Check response status
      if (response?.status === 200) {
        console.log("token", response.token);
        showToast(`${response.message} Redirect to home page.`, "success");
        localStorage.setItem("token", response.token); // Save token
        setTimeout(() => {
          handleNavigation();
        }, 5000);
      } else if (response.status === 400) {
        const message = response?.message || "Bad Request. Login failed.";
        showToast(message, "error");
        console.log(message);
      }
    } catch (error) {
      console.log("Network or unknown error", error);
      showToast("An error occurred. Please try again later.", "error");
    }
  };

  const check_form_validation = () => {
    return new Promise((resolve, reject) => {
      let hasError = false;

      for (const [key, value] of Object.entries(userInfo)) {
        if (value.trim() === "") {
          setError((prev) => ({
            ...prev,
            [key]: {
              type: "error",
              isError: true,
              errorMessage: `Please enter ${key}`,
            },
          }));
          hasError = true;
        }
      }

      // Check if password and confirmPassword match
      // if (
      //   userInfo.password &&
      //   userInfo.confirmPassword &&
      //   userInfo.password !== userInfo.confirmPassword
      // ) {
      //   setError((prev) => ({
      //     ...prev,
      //     confirmPassword: {
      //       type: "error",
      //       isError: true,
      //       errorMessage: "Passwords do not match",
      //     },
      //   }));
      //   hasError = true;
      // }

      if (hasError) {
        reject("Form validation failed. Please fill all required fields.");
      } else {
        resolve("Form validation successful.");
      }
    });
  };

  const handleEyeChange = (input) => {
    setEyeChange((prev) => ({ ...prev, [input]: !prev[input] }));
  };

  return (
    <div className="registerPage_contaner">
      <p className="registerPage_name">Welcome Back!</p>

      <form className="register_form_container">
        {/* username */}
        {/* <div className="registerPage_form_div">
          <div className="input-group mb-3">
            <img
              src={User}
              className="input-group-text"
              id="basic-addon1"
              alt="username"
              loading="lazy"
            />
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="username"
              onChange={(event) => {
                handleChange(event);
              }}
            />
          </div>
          {error?.["username"]?.["isError"] && (
            <HelperText
              message={error?.["username"]?.["errorMessage"]}
              type={error?.["username"]?.["type"]}
            />
          )}
        </div> */}

        {/* email */}
        <div className="registerPage_form_div">
          <div className="input-group mb-3">
            <img
              src={Mail}
              className="input-group-text"
              id="basic-addon1"
              alt="mail"
              loading="lazy"
            />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon1"
              name="email"
              onChange={(event) => {
                handleChange(event);
              }}
            />
          </div>
          {error?.["email"]?.["isError"] && (
            <HelperText
              message={error?.["email"]?.["errorMessage"]}
              type={error?.["email"]?.["type"]}
            />
          )}
        </div>

        {/* password */}
        <div className="registerPage_form_div">
          <div className="input-group mb-3">
            <img
              src={Lock}
              className="input-group-text"
              id="basic-addon1"
              alt="lock"
              loading="lazy"
            />
            <input
              type={eyeChange["password"] ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
              name="password"
              onChange={(event) => {
                handleChange(event);
              }}
            />
            <img
              src={eyeChange["password"] ? EyeOpen : EyeClose}
              className="input-group-text"
              id="basic-addon1"
              alt="password-eyes"
              loading="lazy"
              onClick={() => handleEyeChange("password")}
            />
          </div>
          {error?.["password"]?.["isError"] && (
            <HelperText
              message={error?.["password"]?.["errorMessage"]}
              type={error?.["password"]?.["type"]}
            />
          )}
        </div>

        {/* confirm password */}
        {/* <div className="registerPage_form_div">
          <div className="input-group mb-3">
            <img
              src={Lock}
              className="input-group-text"
              id="basic-addon1"
              alt="lock"
              loading="lazy"
            />
            <input
              type={eyeChange["confirmPassword"] ? "text" : "password"}
              className="form-control"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              aria-describedby="basic-addon1"
              name="confirmPassword"
              onChange={(event) => {
                handleChange(event);
              }}
            />
            <img
              src={eyeChange["confirmPassword"] ? EyeOpen : EyeClose}
              className="input-group-text"
              id="basic-addon1"
              alt="password-eyes"
              loading="lazy"
              onClick={() => handleEyeChange("confirmPassword")}
            />
          </div>
          {error?.["confirmPassword"]?.["isError"] && (
            <HelperText
              message={error?.["confirmPassword"]?.["errorMessage"]}
              type={error?.["confirmPassword"]?.["type"]}
            />
          )}
        </div> */}
      </form>

      <div className="my-3">
        <Link className="registerPage_Link" to="/forget">
          Forgot Password?
        </Link>
      </div>

      <div>
        <button
          className="registerPage_create_btn"
          onClick={create_Account_function}
        >
          Login
        </button>
      </div>

      <div className="mt-5">
        <img src={LoginWith} alt="loginwith" />
      </div>

      <div className="registerPage_loginWith">
        <img src={Fackbook} alt="fackbook" />
        <img src={Google} alt="google" />
      </div>

      <p>
        Don't have an account?{" "}
        <Link className="registerPage_Link" to="/register">
          Register Now
        </Link>
      </p>
    </div>
  );
};

export default Login;
