import { Outlet } from "react-router";
import SideBar from "../SideBar/SideBar";

import "./styles.css"

const Layout = () => {
  return (
    <div className="layout-container">
      <SideBar />
      <Outlet />
    </div>
  );
};
export default Layout;
