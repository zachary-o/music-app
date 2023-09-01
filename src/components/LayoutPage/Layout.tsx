import { FC, useState } from "react";

import { Outlet } from "react-router";

import { ILayoutProps } from "../../interfaces";
import SideBar from "../SideBar/SideBar";
import PlayerModal from "../PlayerModal/PlayerModal";

import "./styles.css";

const Layout: FC<ILayoutProps> = ({
  loggedUser,
  isShowModal,
  setIsShowModal,
  allUsers,
  allSongs,
  currentlyPlaying,
  setCurrentlyPlaying,
}) => {
  return (
    <div className="layout-container">
      <SideBar
        loggedUser={loggedUser}
        allUsers={allUsers}
        allSongs={allSongs}
        currentlyPlaying={currentlyPlaying}
        setCurrentlyPlaying={setCurrentlyPlaying}
        setIsShowModal={setIsShowModal}
      />
      <Outlet />
      {isShowModal && (
        <PlayerModal
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
          currentlyPlaying={currentlyPlaying}
          setCurrentlyPlaying={setCurrentlyPlaying}
          allSongs={allSongs}
        />
      )}
    </div>
  );
};
export default Layout;
