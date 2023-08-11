import { FC, useState } from "react";

import { User } from "../interfaces";

const Login: FC = () => {
  return (
    <div>
      <img src="" alt="logo" />
      <div className="login-btns">
        <button>Sign In</button>
        <button>Sign Up</button>
      </div>
      <div className="login-form-container">
        <form action="">
          <label htmlFor=""></label>
          <input type="text" />
          <label htmlFor=""></label>
          <input type="password" />
          <input type="checkbox" />
          <label htmlFor=""></label>
          <button></button>
        </form>
      </div>
    </div>
  );
};
export default Login;
