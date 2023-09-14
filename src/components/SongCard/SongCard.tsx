import { FC } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  setIsShowModal,
  setIsPlaying,
  setCurrentSong,
  setSongIndex,
} from "../../redux/features/song/songSlice";

import { handleFavSong } from "../../redux/features/user/userSlice";

import { ISong, ISongCardProps } from "../../interfaces";

import { PlayIcon, PauseIcon, HeartIcon } from "@heroicons/react/24/outline";

import "./styles.css";

const SongCard: FC<ISongCardProps> = ({
  id,
  title,
  albumName,
  songUrl,
  coverUrl,
  artist,
}) => {
  const { isPlaying, allSongs } = useAppSelector((state) => state.song);
  const dispatch = useAppDispatch();

  // TOGGLE PLAY PAUSE ICONS ON CLICK
  const togglePlaying = () => {
    if (isPlaying === id) {
      dispatch(setIsPlaying(null));
    } else {
      dispatch(setIsPlaying(id));
      dispatch(setIsShowModal(true));

      const songIndex = allSongs.findIndex((song) => song.id === id);

      if (songIndex !== -1) {
        dispatch(setSongIndex(songIndex));
        dispatch(setCurrentSong(allSongs[songIndex]));
      }
    }
  };

  return (
    <div className="song-card-container">
      <div className="cover-container">
        <img src={coverUrl} alt="album-cover" className="album-cover" />
        <div className="play-pause-icons" onClick={togglePlaying}>
          {isPlaying == id ? (
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
          onClick={() => dispatch(handleFavSong(id))}
        />
      </div>
    </div>
  );
};
export default SongCard;
