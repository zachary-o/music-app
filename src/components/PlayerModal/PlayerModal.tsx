import { FC } from "react";
import { IPlayerModalProps } from "../../interfaces";

import {
  XMarkIcon,
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
} from "@heroicons/react/24/solid";

import "./styles.css";

const PlayerModal: FC<IPlayerModalProps> = ({
  isShowModal,
  setIsShowModal,
  setCurrentlyPlaying,
}) => {
  return (
    <div
      className={isShowModal ? "player-container-active" : "player-container"}
    >
      <div className="music-container">
        <div className="modal-cover">
          <img src="./covers/Вулиця Наталі.jpeg" alt="" />
        </div>
        <div className="progress-container">
          <div className="progress"></div>
        </div>
        <div className="navigation">
          <BackwardIcon className="navigation-icon"/>
          <PlayIcon className="navigation-icon big"/>
          <PauseIcon className="navigation-icon big"/>
          <ForwardIcon className="navigation-icon"/>
        </div>
        <audio src="./songs/Артист.mp3"></audio>

        <XMarkIcon
          onClick={() => {
            setIsShowModal(false);
            setCurrentlyPlaying(null);
          }}
          className="close-modal-icon"
        />
      </div>
    </div>
  );
};
export default PlayerModal;
