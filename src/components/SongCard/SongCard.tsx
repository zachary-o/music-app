import { FC } from "react";
import { ISong } from "../../interfaces";

import "./styles.css";

const SongCard: FC<ISong> = ({
  id,
  title,
  albumName,
  songUrl,
  coverUrl,
  artist,
}) => {
  return (
    <div className="song-card-container">
      <img src={coverUrl} alt="album-cover" className="album-cover" />
      <div className="song-info-container">
        <div className="song-info">
          <h4>{artist}</h4>
          <h5>{title}</h5>
          <p>{albumName}</p>
        </div>
      </div>
    </div>
  );
};
export default SongCard;
