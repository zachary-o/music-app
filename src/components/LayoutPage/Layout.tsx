import { FC } from "react";

import { Outlet } from "react-router";

import SideBar from "../SideBar/SideBar";
import PlayerModal from "../PlayerModal/PlayerModal";

import "./styles.css";
import { useAppSelector } from "../../redux/app/hooks";

const Layout: FC = () => {
  const isShowModal = useAppSelector((state) => state.song.isShowModal);

  return (
    <div className="layout-container">
      <SideBar />
      <Outlet />
      {isShowModal && <PlayerModal />}
    </div>
  );
};
export default Layout;
