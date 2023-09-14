import { FC } from "react";
import { useAppSelector } from "../../redux/app/hooks";

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
  // TOGGLE PLAY PAUSE ICONS ON CLICK
  // const isCurrentlyPlaying: boolean = currentlyPlaying === id;
  // const togglePlaying = () => {
  //   if (isCurrentlyPlaying) {
  //     setCurrentlyPlaying(null);
  //   } else {
  //     setCurrentlyPlaying(id);
  //     setIsShowModal(true);
  //   }
  // };

  return (
    <div className="favorite-song-container">
      <div className="cover-song-info">
        <div className="cover-container-favs">
          <img src={coverUrl} alt="" className="favorites-cover" />
          <div className="play-pause-icons-favs">
            {/* {isCurrentlyPlaying ? (
              <PauseIcon className="pause-cover-favs" />
            ) : (
              <PlayIcon className="play-cover-favs" />
            )} */}
          </div>
        </div>
        <div className="artist-title">
          <p>{artist}</p>
          <p>{title}</p>
        </div>
      </div>
      <HeartIcon className="favorite-icon" />
    </div>
  );
};
export default LikedSong;
