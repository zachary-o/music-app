import { useState, FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./redux/app/hooks";
import { setNewUserData } from "./redux/features/user/userSlice";

import { ISong } from "./interfaces";

import Layout from "./components/LayoutPage/Layout";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";

import data from "./data.json";

const App: FC = () => {
  const [allSongs, setAllSongs] = useState<ISong[]>(data);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedUser =
      localStorage.getItem("localStorageUser") ||
      sessionStorage.getItem("sessionStorageUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      dispatch(setNewUserData(user));
    }
  }, []);

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Layout allSongs={allSongs} />}>
          <Route index element={<HomePage allSongs={allSongs} />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
