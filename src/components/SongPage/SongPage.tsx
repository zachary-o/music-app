import { useNavigate, useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../redux/app/hooks";
import {
  setCurrentSong,
  setSongIndex,
  setIsPlaying,
  setIsShowModal,
} from "../../redux/features/song/songSlice";
import {
  addToFavorites,
  removeFromFavorites,
  resetUserError,
} from "../../redux/features/user/userSlice";

import { PlayIcon, PauseIcon, HeartIcon } from "@heroicons/react/24/outline";

import "./styles.css";
import { useEffect } from "react";
import { ISong } from "../../interfaces";

const SongPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { songId } = useParams();
  const { allSongs, isPlaying } = useAppSelector((state) => state.song);
  const user = useAppSelector((state) => state.user.user);
  const neededSong: ISong | undefined = allSongs.find(
    (song) => song.id === songId
  );

  const handleLogout = () => {
    localStorage.removeItem("localStorageUser");
    sessionStorage.removeItem("sessionStorageUser");
    dispatch(setIsPlaying(null));
    dispatch(setIsShowModal(false));
    dispatch(setSongIndex(0));
    dispatch(setCurrentSong(allSongs[0]));
    dispatch(resetUserError());
    navigate("/login");
  };

  const togglePlaying = () => {
    if (isPlaying === neededSong?.id) {
      dispatch(setIsPlaying(null));
    } else {
      dispatch(setIsPlaying(neededSong?.id));
      dispatch(setIsShowModal(true));

      const songIndex = allSongs.findIndex(
        (song) => song.id === neededSong?.id
      );

      if (songIndex !== -1) {
        dispatch(setSongIndex(songIndex));
        dispatch(setCurrentSong(allSongs[songIndex]));
      }
    }
  };

  const setLikeIconStyle = () => {
    if (neededSong && user.favorites.includes(neededSong.id)) {
      return "song-details-icons__like-icon-added";
    }
    return "song-details-icons__like-icon";
  };

  return (
    <main className="song-page-container">
      {user.userName ? (
        <div className="logged-user-container">
          <h2>Hello, {user.userName}</h2>
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
      <section className="song-details-container">
        <div className="song-details-cover">
          <img src={neededSong?.coverUrl} alt="" />
        </div>
        <div className="song-details-info">
          <h1>{neededSong?.artist}</h1>
          <h2>{neededSong?.title}</h2>
          <div className="song-details-icons">
            <div
              className="song-details-icons__play-pause"
              onClick={togglePlaying}
            >
              {isPlaying == neededSong?.id ? (
                <PauseIcon className="pause-cover" />
              ) : (
                <PlayIcon className="play-cover" />
              )}
            </div>

            <HeartIcon
              className={setLikeIconStyle()}
              onClick={() =>
                neededSong && user.favorites.includes(neededSong.id)
                  ? dispatch(removeFromFavorites(neededSong.id))
                  : dispatch(addToFavorites(neededSong?.id || ""))
              }
            />
          </div>
        </div>
      </section>
    </main>
  );
};
export default SongPage;
