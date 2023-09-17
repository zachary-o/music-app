import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../redux/app/hooks";
import {
  setIsPlaying,
  setIsShowModal,
  setCurrentSong,
  setSongIndex,
} from "../../redux/features/song/songSlice";

import SongCard from "../SongCard/SongCard";

import { ISong } from "../../interfaces";

import "./styles.css";

const SearchPage = () => {
  const [searchInput, setSearchInputs] = useState("");
  const [searchResults, setSearchResults] = useState<ISong[]>([]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);
  const allSongs = useAppSelector((state) => state.song.allSongs);

  const handleLogout = () => {
    localStorage.removeItem("localStorageUser");
    sessionStorage.removeItem("sessionStorageUser");
    dispatch(setIsPlaying(null));
    dispatch(setIsShowModal(false));
    dispatch(setSongIndex(0));
    dispatch(setCurrentSong(allSongs[0]));
    navigate("/login");
  };

  useEffect(() => {
    if (searchInput) {
      const queryResults = allSongs.filter((song) => {
        const searchTerm = searchInput.toLowerCase();
        const title = song.title.toLowerCase();
        const album = song.albumName.toLowerCase();

        return title.includes(searchTerm) || album.includes(searchTerm);
      });
      setSearchResults(queryResults);
    } else {
      setSearchResults([]);
    }
  }, [searchInput, allSongs]);

  return (
    <main className="search-page-container">
      {user.userName ? (
        <div className="logged-user-container">
          <h2>Hello, {user.userName}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="auth-buttons-container">
          <button
            onClick={() => {
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
      <section className="input-results-container">
        <div className="input-container">
          <input
            type="text"
            className="search"
            placeholder="Search..."
            value={searchInput}
            onChange={(event) => setSearchInputs(event.target.value)}
          />
        </div>
        <div className="search-results">
          {searchResults.map((song) => (
            <SongCard {...song} key={song.id} />
          ))}
        </div>
      </section>
    </main>
  );
};
export default SearchPage;
