import React, { useState, useEffect, FC } from "react";
import { Routes, Route } from "react-router-dom";

import { IUser, ILoggedUser } from "./interfaces";
import getUsers from "./utils/getUsers";

import Layout from "./components/LayoutPage/Layout";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";

const App: FC = () => {
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [loggeduser, setLoggedUser] = useState<ILoggedUser>({
    userName: "",
    password: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const users: IUser[] = await getUsers();
      setAllUsers(users);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedUser");
    if (savedUser) {
      setLoggedUser(JSON.parse(savedUser));
    }
  }, []);

  console.log("loggeduser", loggeduser);
  console.log("allUsers", allUsers);

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route
          path="/login"
          element={<Login allUsers={allUsers} setAllUsers={setAllUsers} />}
        />
      </Routes>
    </div>
  );
};

export default App;
