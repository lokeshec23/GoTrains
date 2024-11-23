import "../styles/Register.css";
import User from "../assets/images/Register/User.svg";
import Mail from "../assets/images/Register/Mail.svg";
import Lock from "../assets/images/Register/lock.svg";
import LoginWith from "../assets/images/Register/LoginWith.svg";
import Fackbook from "../assets/images/Register/Fackbook_2.svg";
import Google from "../assets/images/Register/Google.svg";
import X from "../assets/images/Register/X.svg";
import Apple from "../assets/images/Register/Apple.svg";
import { Link } from "react-router-dom";
import HelperText from "../utils/HelperText";
import { useState } from "react";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    debugger;
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
    const isVerified = await check_form_validation();
    if (!isVerified) return;
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
      if (
        userInfo.password &&
        userInfo.confirmPassword &&
        userInfo.password !== userInfo.confirmPassword
      ) {
        setError((prev) => ({
          ...prev,
          confirmPassword: {
            type: "error",
            isError: true,
            errorMessage: "Passwords do not match",
          },
        }));
        hasError = true;
      }

      if (hasError) {
        reject("Form validation failed. Please fill all required fields.");
      } else {
        resolve("Form validation successful.");
      }
    });
  };

  return (
    <div className="registerPage_contaner">
      <p className="registerPage_name">Create an account</p>

      <form className="register_form_container">
        {/* username */}
        <div className="registerPage_form_div">
          <div className="input-group mb-3">
            <img
              src={User}
              className="input-group-text"
              id="basic-addon1"
              alt="usernaem"
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
        </div>

        {/* email */}
        <div className="registerPage_form_div">
          <div className="input-group mb-3">
            <img
              src={Mail}
              className="input-group-text"
              id="basic-addon1"
              alt="mail"
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
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
              name="password"
              onChange={(event) => {
                handleChange(event);
              }}
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
        <div className="registerPage_form_div">
          <div className="input-group mb-3">
            <img
              src={Lock}
              className="input-group-text"
              id="basic-addon1"
              alt="lock"
            />
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              aria-describedby="basic-addon1"
              name="confirmPassword"
              onChange={(event) => {
                handleChange(event);
              }}
            />
          </div>
          {error?.["confirmPassword"]?.["isError"] && (
            <HelperText
              message={error?.["confirmPassword"]?.["errorMessage"]}
              type={error?.["confirmPassword"]?.["type"]}
            />
          )}
        </div>
      </form>

      <div>
        <button
          className="registerPage_create_btn"
          onClick={create_Account_function}
        >
          Create Account
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
        I Already Have an Account <Link>Login</Link>
      </p>
    </div>
  );
};

export default Register;
