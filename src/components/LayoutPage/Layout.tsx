import { FC } from "react";

import { Outlet } from "react-router";

import { ILayoutProps } from "../../interfaces";
import SideBar from "../SideBar/SideBar";
import PlayerModal from "../PlayerModal/PlayerModal";

import "./styles.css";
import { useAppSelector } from "../../redux/app/hooks";

const Layout: FC<ILayoutProps> = ({ allSongs }) => {
  const isShowModal = useAppSelector((state) => state.song.isShowModal);

  return (
    <div className="layout-container">
      <SideBar allSongs={allSongs} />
      <Outlet />
      {isShowModal && <PlayerModal allSongs={allSongs} />}
    </div>
  );
};
export default Layout;
