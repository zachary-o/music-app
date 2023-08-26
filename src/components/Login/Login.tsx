import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser, ILoginProps } from "../../interfaces";

import registerUser from "../../utils/registerUser";

import "./styles.css";
import logo from "../../assets/logo.png";

const Login: FC<ILoginProps> = ({ allUsers, setAllUsers }) => {
  const [authType, setAuthType] = useState<boolean>(true);
  const [rememberAcc, setRememberAcc] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [authStatus, setAuthStatus] = useState<AuthStatus>("");

  const navigate = useNavigate();

  type AuthStatus =
    | "User not found"
    | "Login must be at least 6 characters"
    | "Password must be at least 6 characters"
    | "User already exists"
    | "User successfully registered"
    | "Enter credentials"
    | "Logged in"
    | "";

  // USER LOGIN FUNCTION
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.userName.length < 6) {
      setAuthStatus("Login must be at least 6 characters");
      return;
    }
    if (formData.password.length < 6) {
      setAuthStatus("Password must be at least 6 characters");
      return;
    }
    if (formData.userName.trim() === "" || formData.password.trim() === "") {
      setAuthStatus("Enter credentials");
      return;
    }
    if (
      allUsers?.find((user) => user.userName === formData.userName) &&
      allUsers?.find((user) => user.password === formData.password) &&
      !rememberAcc
    ) {
      sessionStorage.setItem("sessionStorageUser", JSON.stringify(formData));
      setFormData({ userName: "", password: "" });
      navigate("/");
      setAuthType(true);
    }
    if (
      allUsers?.find((user) => user.userName === formData.userName) &&
      allUsers?.find((user) => user.password === formData.password) &&
      rememberAcc
    ) {
      localStorage.setItem("localStorageUser", JSON.stringify(formData));
      setFormData({ userName: "", password: "" });
      navigate("/");
      setAuthType(true);
    }
  };

  // USER REGISTER FUNCTION
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.userName.length < 6) {
      setAuthStatus("Login must be at least 6 characters");
      return;
    }
    if (formData.password.length < 6) {
      setAuthStatus("Password must be at least 6 characters");
      return;
    }
    if (allUsers?.find((user) => user.userName === formData.userName)) {
      setAuthStatus("User already exists");
      return;
    }
    if (formData.userName.trim() === "" || formData.password.trim() === "") {
      setAuthStatus("Enter credentials");
      return;
    }
    if (formData && !rememberAcc) {
      const newUser: IUser = {
        id: "",
        userName: formData?.userName,
        password: formData?.password,
      };
      setAllUsers((prevUsers) => [...(prevUsers || []), newUser]);
      sessionStorage.setItem("sessionStorageUser", JSON.stringify(newUser));
      try {
        const user = await registerUser(newUser);
        navigate("/");
        return user;
      } catch (error) {
        throw error;
      }
    }
    setAuthType(true);
    setFormData({ userName: "", password: "" });
    if (formData && rememberAcc) {
      const newUser = {
        userName: formData?.userName,
        password: formData?.password,
      };
      setAllUsers((prevUsers) => [...(prevUsers || []), newUser]);
      localStorage.setItem("localStorageUser", JSON.stringify(newUser));
      try {
        const user = await registerUser(newUser);
        navigate("/");
        return user;
      } catch (error) {
        throw error;
      }
    }
    setAuthType(true);
    setFormData({ userName: "", password: "" });
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
          }}
        >
          Sign In
        </button>
        <button
          className={!authType ? "signup-btn active" : "signup-btn"}
          onClick={() => {
            setAuthType(false);
            setFormData({ userName: "", password: "" });
          }}
        >
          Sign Up
        </button>
      </div>
      <div className="login-form-container">
        <form action="">
          <p>{authStatus}</p>
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
