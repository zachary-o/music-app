import { useNavigate } from "react-router-dom";

import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import logo from "../../assets/logo.png";

import "./styles.css";

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <aside className="sidebar-container">
      <img src={logo} alt="" className="sidebar-logo" />
      <section className="links-container">
        <div className="home-link">
          <HomeIcon className="link-icon" />
          <h4>Home</h4>
        </div>
        <div className="search-link">
          <MagnifyingGlassIcon className="link-icon" />
          <h4>Search</h4>
        </div>
      </section>
      <section className="favorites-container">
        <div className="favorites-unlogged">
          <h2>Your favorites:</h2>
          <p>You need to log in to save your favorite songs</p>
          <button onClick={() => navigate("/login")}>Let's go</button>
        </div>
      </section>
    </aside>
  );
};
export default SideBar;
