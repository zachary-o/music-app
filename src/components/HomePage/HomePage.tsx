import { FC } from "react";

import { useAppSelector, useAppDispatch } from "../../redux/app/hooks";
import {
  setIsPlaying,
  setIsShowModal,
  setCurrentSong,
  setSongIndex,
} from "../../redux/features/song/songSlice";
import { resetUserError } from "../../redux/features/user/userSlice";

import { useNavigate } from "react-router-dom";

import SongCard from "../SongCard/SongCard";

import "./styles.css";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const allSongs = useAppSelector((state) => state.song.allSongs);

  const handleLogout = () => {
    localStorage.removeItem("localStorageUser");
    sessionStorage.removeItem("sessionStorageUser");
    dispatch(resetUserError());
    dispatch(setIsPlaying(null));
    dispatch(setIsShowModal(false));
    dispatch(setSongIndex(0));
    dispatch(setCurrentSong(allSongs[0]));
    navigate("/login");
  };

  return (
    <main className="homepage-container">
      {user.user.userName ? (
        <div className="logged-user-container">
          <h2>Hello, {user.user.userName}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="auth-buttons-container">
          <button
            onClick={() => {
              dispatch(resetUserError());
              navigate("/login");
              dispatch(setIsPlaying(null));
              dispatch(setIsShowModal(false));
              dispatch(setSongIndex(0));
              dispatch(setCurrentSong(allSongs[0]));
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              dispatch(resetUserError());
              navigate("/login");
              dispatch(setIsPlaying(null));
              dispatch(setIsShowModal(false));
              dispatch(setSongIndex(0));
              dispatch(setCurrentSong(allSongs[0]));
            }}
          >
            Sign Up
          </button>
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
