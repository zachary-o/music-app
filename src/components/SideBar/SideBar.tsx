import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LikedSong from "../LikedSong/LikedSong";

import { ISideBadProps, ISong, IUser } from "../../interfaces";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import logo from "../../assets/logo.png";

import "./styles.css";

const SideBar: FC<ISideBadProps> = ({
  loggedUser,
  allUsers,
  allSongs,
  currentlyPlaying,
  setCurrentlyPlaying,
  setIsShowModal,
}) => {
  const [favorites, setFavorites] = useState<ISong[] | null>(null);
  const navigate = useNavigate();

  const neededUser: IUser | null =
    allUsers?.find((user) => user.userName === loggedUser.userName) || null;

  useEffect(() => {
    const neededSongs: ISong[] = neededUser?.favorites
      ? allSongs.filter((song) => neededUser.favorites?.includes(song.id))
      : [];
    setFavorites(neededSongs);
  }, [neededUser]);

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
        {loggedUser.userName.trim() !== "" ? (
          <div className="favorites-logged">
            <h2>Your favorites:</h2>
            <p>Like your favorite songs to save them here.</p>

            <div className="favorites-list">
              {favorites?.map((song) => (
                <LikedSong
                  key={song.id}
                  {...song}
                  currentlyPlaying={currentlyPlaying}
                  setCurrentlyPlaying={setCurrentlyPlaying}
                  setIsShowModal={setIsShowModal}
                />
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
