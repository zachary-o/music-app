import React, { useState, useEffect, FC } from "react";
import { Routes, Route } from "react-router-dom";

import { IUser, ILoggedUser, ISong } from "./interfaces";
import getUsers from "./utils/getUsers";
import getSongs from "./utils/getSongs";

import Layout from "./components/LayoutPage/Layout";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";

const App: FC = () => {
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [allSongs, setAllSongs] = useState<ISong[]>([]);
  const [loggedUser, setLoggedUser] = useState<ILoggedUser>({
    userName: "",
    password: "",
  });

  // GET ALL USERS AND SONGS ON APP LOAD
  useEffect(() => {
    const fetchUsers = async () => {
      const users: IUser[] = await getUsers();
      setAllUsers(users);
    };
    fetchUsers();

    const fetchSongs = async () => {
      const songs: ISong[] = await getSongs();
      setAllSongs(songs);
    };
    fetchSongs();
  }, []);

  // GET LOCALSTORAGE OR SESSIONSTORAGE
  useEffect(() => {
    const savedUser = localStorage.getItem("localStorageUser");
    const sessionUser = sessionStorage.getItem("sessionStorageUser");
    if (sessionUser && !savedUser) {
      setLoggedUser(JSON.parse(sessionUser));
    }
    if (savedUser && sessionUser) {
      setLoggedUser(JSON.parse(savedUser));
    }
  }, []);

  console.log("loggeduser", loggedUser);
  console.log("allUsers", allUsers);
  console.log("allSongs", allSongs);

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<HomePage allSongs={allSongs} loggedUser={loggedUser} />}
          />
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
