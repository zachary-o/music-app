import { FC } from "react";

import { useAppSelector } from "../../redux/app/hooks";

import { useNavigate } from "react-router-dom";

import SongCard from "../SongCard/SongCard";

import "./styles.css";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const allSongs = useAppSelector((state) => state.song.allSongs);

  const handleLogout = () => {
    localStorage.removeItem("localStorageUser");
    sessionStorage.removeItem("sessionStorageUser");
  };

  return (
    <main className="homepage-container">
      {user.userName ? (
        <div className="logged-user-container">
          <h2>Hello, {user.userName}</h2>
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
            <SongCard {...song} key={song.id} />
          ))}
        </div>
      </div>
    </main>
  );
};
export default HomePage;
