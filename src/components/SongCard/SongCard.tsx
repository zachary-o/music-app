import { FC, ReactNode, useState } from "react";
import { ISong, ISongCardProps, IUser } from "../../interfaces";

import updateUser from "../../utils/updateUser";

import { PlayIcon, PauseIcon, HeartIcon } from "@heroicons/react/24/outline";

import "./styles.css";

const SongCard: FC<ISongCardProps> = ({
  id,
  title,
  albumName,
  songUrl,
  coverUrl,
  artist,
  allSongs,
  setIsShowModal,
  allUsers,
  setAllUsers,
  loggedUser,
  currentlyPlaying,
  setCurrentlyPlaying,
}) => {
  // TOGGLE PLAY PAUSE ICONS ON CLICK
  const isCurrentlyPlaying: boolean = currentlyPlaying === id;
  const togglePlaying = () => {
    if (isCurrentlyPlaying) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(id);
      setIsShowModal(true);
    }
  };

  // ADD SONG TO FAVORITES
  const neededUser = allUsers?.find(
    (user) => user.userName === loggedUser.userName
  );
  const addToFavorites = async (userId: string, songId: string) => {
    try {
      if (neededUser) {
        const updatedFavorites: IUser | null = await updateUser(userId, songId);
        return updatedFavorites;
      }
    } catch (error) {
      return null;
    }
  };

  // HEART ICON STYLE DEPENDING WHETHER IT IS LIKED OR NOT
  const likeBtnStyle = () => {};

  return (
    <div className="song-card-container">
      <div className="cover-container">
        <img src={coverUrl} alt="album-cover" className="album-cover" />
        <div className="play-pause-icons" onClick={togglePlaying}>
          {isCurrentlyPlaying ? (
            <PauseIcon className="pause-cover" />
          ) : (
            <PlayIcon className="play-cover" />
          )}
        </div>
      </div>
      <div className="song-info-container">
        <div className="song-info">
          <h4>{title}</h4>
          <h5>{artist}</h5>
          <p>{albumName}</p>
        </div>
        <HeartIcon
          className="like-icon"
          onClick={() => addToFavorites(neededUser?.id ?? "", id)}
        />
      </div>
    </div>
  );
};
export default SongCard;
