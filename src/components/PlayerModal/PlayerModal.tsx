import { FC } from "react";
import { IPlayerModalProps } from "../../interfaces";

import { XMarkIcon } from "@heroicons/react/24/solid";

import "./styles.css";

const PlayerModal: FC<IPlayerModalProps> = ({
  isShowModal,
  setIsShowModal,
}) => {
  return (
    <div
      className={isShowModal ? "player-container-active" : "player-container"}
    >
      PlayerModal
      <XMarkIcon onClick={() => setIsShowModal(false)} className="close-modal-icon"/>
    </div>
  );
};
export default PlayerModal;
