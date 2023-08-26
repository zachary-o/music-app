import { FC } from "react";

import { ILikedSongProps } from "../../interfaces";
import "./styles.css";

const LikedSong: FC<ILikedSongProps> = ({
  id,
  title,
  albumName,
  songUrl,
  coverUrl,
  artist,
}) => {
  return <div>LikedSong</div>;
};
export default LikedSong;
