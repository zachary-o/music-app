import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IHomePageProps } from "../../interfaces";
import SongCard from "../SongCard/SongCard";

import "./styles.css";

const HomePage: FC<IHomePageProps> = ({
  allSongs,
  loggedUser,
  setIsShowModal,
  allUsers,
  setAllUsers,
  currentlyPlaying,
  setCurrentlyPlaying,
}) => {
  const navigate = useNavigate();

  console.log("loggeduser", loggedUser);

  const handleLogout = () => {
    localStorage.removeItem("localStorageUser");
    sessionStorage.removeItem("sessionStorageUser");
    navigate("/login");
  };

  return (
    <main className="homepage-container">
      {loggedUser.userName.trim() !== "" ? (
        <div className="logged-user-container">
          <h2>Hello, {loggedUser.userName}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="auth-buttons-container">
          <button onClick={() => navigate("/login")}>Sign In</button>
          <button onClick={() => navigate("/login")}>Sign Up</button>
        </div>
      )}

      <div className="songs-container">
        <h1>Listen music without borders.</h1>
        <div className="songs-grid">
          {allSongs?.map((song) => (
            <SongCard
              {...song}
              key={song.id}
              allSongs={allSongs}
              setIsShowModal={setIsShowModal}
              allUsers={allUsers}
              setAllUsers={setAllUsers}
              loggedUser={loggedUser}
              currentlyPlaying={currentlyPlaying}
              setCurrentlyPlaying={setCurrentlyPlaying}
            />
          ))}
        </div>
      </div>
    </main>
  );
};
export default HomePage;
