import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  setIsPlaying,
  setIsShowModal,
  setSongIndex,
  setCurrentSong,
} from "../../redux/features/song/songSlice";
import { removeFromFavorites } from "../../redux/features/user/userSlice";

import { ILikedSongProps } from "../../interfaces";

import { PlayIcon, PauseIcon, HeartIcon } from "@heroicons/react/24/solid";
import "./styles.css";

const LikedSong: FC<ILikedSongProps> = ({
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
    <div className="favorite-song-container">
      <div className="cover-song-info">
        <div className="cover-container-favs">
          <img src={coverUrl} alt="" className="favorites-cover" />
          <div className="play-pause-icons-favs" onClick={togglePlaying}>
            {isPlaying === id ? (
              <PauseIcon className="pause-cover-favs" />
            ) : (
              <PlayIcon className="play-cover-favs" />
            )}
          </div>
        </div>
        <div className="artist-title">
          <p>{artist}</p>
          <p>{title}</p>
        </div>
      </div>
      <HeartIcon
        className="favorite-icon"
        onClick={() => dispatch(removeFromFavorites(id))}
      />
    </div>
  );
};
export default LikedSong;
