import { FC, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  loginUser,
  registerUser,
  setNewUserData,
} from "../../redux/features/user/userSlice";

import { useNavigate } from "react-router-dom";

import "./styles.css";
import logo from "../../assets/logo.png";

const Login: FC = () => {
  const [authType, setAuthType] = useState<boolean>(true);
  const [rememberAcc, setRememberAcc] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const errorMessage = useAppSelector((state) => state.user.error);

  console.log("USER: ", user);

  // USER LOGIN FUNCTION
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(
      loginUser({
        formData: { ...formData },
        rememberAcc,
      })
    )
      .unwrap()
      .then(() => {
        setFormData({ userName: "", password: "" });
        navigate("/");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  // USER REGISTER FUNCTION
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(
      registerUser({
        formData: { ...formData },
        rememberAcc,
      })
    )
      .unwrap()
      .then(() => {
        setFormData({ userName: "", password: "" });
        navigate("/");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="login-container">
      <img src={logo} alt="logo" className="login-logo" />
      <div className="login-btns">
        <button
          className={authType ? "login-btn active" : "login-btn"}
          onClick={() => {
            setAuthType(true);
            setFormData({ userName: "", password: "" });
            dispatch(setNewUserData(user.error === ""));
          }}
        >
          Sign In
        </button>
        <button
          className={!authType ? "signup-btn active" : "signup-btn"}
          onClick={() => {
            setAuthType(false);
            setFormData({ userName: "", password: "" });
            dispatch(setNewUserData((user.error = "")));
          }}
        >
          Sign Up
        </button>
      </div>
      <div className="login-form-container">
        <div className="error-container">
          {errorMessage && (
            <div className="error" role="alert">
              {errorMessage}
            </div>
          )}
        </div>
        <form action="">
          <label htmlFor="login">Username / Email</label>
          <input
            type="text"
            placeholder="Enter your login"
            required
            id="login"
            name="userName"
            value={formData.userName}
            onChange={(event) =>
              setFormData({ ...formData, userName: event.target.value })
            }
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            id="password"
            name="password"
            value={formData.password}
            onChange={(event) =>
              setFormData({ ...formData, password: event.target.value })
            }
          />
          <div className="toggle-container">
            <label className="toggle">
              <input
                type="checkbox"
                onChange={() => setRememberAcc((prev) => !prev)}
              />
              <span className="toggle-slider"></span>
            </label>
            <p>Remember me</p>
          </div>

          <button
            className="login-action-btn"
            onClick={
              authType
                ? (event) => handleLogin(event)
                : (event) => handleRegister(event)
            }
          >
            {authType ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
