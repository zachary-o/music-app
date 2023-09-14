import { FC } from "react";

import { useAppSelector } from "../../redux/app/hooks";

import { useNavigate } from "react-router-dom";

import LikedSong from "../LikedSong/LikedSong";

import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import logo from "../../assets/logo.png";

import "./styles.css";

const SideBar: FC = () => {
  const navigate = useNavigate();

  const favoritesUser = useAppSelector((state) => state.user.user.favorites);
  const allSongs = useAppSelector((state) => state.song.allSongs);

  const favoriteSongs = allSongs.filter((song) =>
    favoritesUser.some((songs) => songs === song.id)
  );

  return (
    <aside className="sidebar-container">
      <img src={logo} alt="" className="sidebar-logo" />
      <section className="links-container">
        <div className="home-link">
          <HomeIcon className="link-icon" />
          <h4>Home</h4>
        </div>
        <div className="search-link">
          <MagnifyingGlassIcon className="link-icon" />
          <h4>Search</h4>
        </div>
      </section>
      <section className="favorites-container">
        {favoritesUser ? (
          <div className="favorites-logged">
            <h2>Your favorites:</h2>
            <p>Like your favorite songs to save them here.</p>

            <div className="favorites-list">
              {favoriteSongs?.map((song) => (
                <LikedSong key={song.id} {...song} />
              ))}
            </div>
          </div>
        ) : (
          <div className="favorites-unlogged">
            <h2>Your favorites:</h2>
            <p>You need to log in to save your favorite songs</p>
            <button onClick={() => navigate("/login")}>Let's go</button>
          </div>
        )}
      </section>
    </aside>
  );
};
export default SideBar;
