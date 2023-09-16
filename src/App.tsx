import { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useAppDispatch } from "./redux/app/hooks";
import { setAllSongs } from "./redux/features/song/songSlice";
import { setNewUserData } from "./redux/features/user/userSlice";

import Layout from "./components/LayoutPage/Layout";
import HomePage from "./components/HomePage/HomePage";
import SearchPage from "./components/SearchPage/SearchPage";
import Login from "./components/Login/Login";

import data from "./data.json";

const App: FC = () => {
  const dispatch = useAppDispatch();
  dispatch(setAllSongs(data));

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
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          //Song Page
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
