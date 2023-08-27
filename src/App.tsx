import React, { useState, useEffect, FC } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { IUser, ILoggedUser, ISong } from "./interfaces";
import getUsers from "./utils/getUsers";

import Layout from "./components/LayoutPage/Layout";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";

import data from "./data.json";

const App: FC = () => {
  const [allUsers, setAllUsers] = useState<IUser[] | null>(null);
  const [allSongs, setAllSongs] = useState<ISong[]>(data);
  const [loggedUser, setLoggedUser] = useState<ILoggedUser>({
    userName: "",
    password: "",
  });
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  const navigate = useNavigate();

  // GET ALL USERS ON APP LOAD
  useEffect(() => {
    const fetchUsers = async () => {
      const users: IUser[] | null = await getUsers();
      if (users !== null) {
        setAllUsers(users);
      }
    };
    fetchUsers();
  }, []);

  // GET LOCALSTORAGE OR SESSIONSTORAGE USER
  useEffect(() => {
    const savedUser = localStorage.getItem("localStorageUser");
    const sessionUser = sessionStorage.getItem("sessionStorageUser");
    if (sessionUser && !savedUser) {
      setLoggedUser(JSON.parse(sessionUser));
    }
    if (savedUser && sessionUser) {
      setLoggedUser(JSON.parse(savedUser));
    }
  }, [navigate]);

  // console.log("allUsers", allUsers);
  console.log("allSongs", allSongs);

  return (
    <div className="wrapper">
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              loggedUser={loggedUser}
              allUsers={allUsers}
              allSongs={allSongs}
              isShowModal={isShowModal}
              setIsShowModal={setIsShowModal}
              currentlyPlaying={currentlyPlaying}
              setCurrentlyPlaying={setCurrentlyPlaying}
            />
          }
        >
          <Route
            index
            element={
              <HomePage
                allSongs={allSongs}
                loggedUser={loggedUser}
                setIsShowModal={setIsShowModal}
                allUsers={allUsers}
                setAllUsers={setAllUsers}
                currentlyPlaying={currentlyPlaying}
                setCurrentlyPlaying={setCurrentlyPlaying}
              />
            }
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
