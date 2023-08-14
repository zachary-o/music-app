import { Outlet } from "react-router";
import SideBar from "../SideBar/SideBar";

const Layout = () => {
  return (
    <div className="layout-container">
      <SideBar />
      <Outlet />
    </div>
  );
};
export default Layout;
