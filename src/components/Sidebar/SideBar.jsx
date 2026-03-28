import { useRef, useState } from "react";
import "@/styles/sidebar.css";
import SideBarOpen from "@public/icons/SideBarOpen";
import SideBarClose from "@public/icons/SideBarClose";
import { NavLink } from "react-router";
import NavItem from "./NavItem";
import ElementsIcon from "../../../public/icons/ElementsIcon";
import PlusIcon from "../../../public/icons/PlusIcon";
import HeaderIcon from "../../../public/icons/HeaderIcon";
import DropdownIcon from "../../../public/icons/DropdownIcon";
import PopoverIcon from "../../../public/icons/PopoverIcon";
import ToastIcon from "../../../public/icons/ToastIcon";
import DarkModeIcon from "../../../public/icons/DarkModeIcon";
import NavItemProx from "./NavItemProx";

export default function SideBar() {
  const toggleMenuButton = useRef(null);

  const sideBar = useRef(null);
  const [open, setOpen] = useState(true);
  function handleToggleSideBar() {
    // sideBar.current.classList.toggle("mini-sidebar");
    document
      .querySelectorAll(".sidebar span")
      .forEach((span) => span.classList.toggle("oculto"));
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }
  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }
  return (
    <aside className={`sidebar ${!open ? "mini-sidebar" : ""}`} ref={sideBar}>
      <div className="hero-menu">
        <button ref={toggleMenuButton} onClick={handleToggleSideBar} id="cloud">
          {open ? (
            <SideBarClose props={{ id: "cloud" }} />
          ) : (
            <SideBarOpen props={{ id: "cloud" }} />
          )}
        </button>
        <span className="sidebarSpan">Animations</span>
      </div>
      <NavLink to={"/new"} id="create-new" className="button">
        <PlusIcon />
        <span className="sidebarSpan">Create New</span>
      </NavLink>
      <nav className="navSidebar">
        <ul>
          {/* <NavItem to={"/"} textButton={"Elements"}>
              <ElementsIcon />
            </NavItem> */}

          <NavItem to={"/dropdowns"} textButton={"Dropdowns"}>
            <DropdownIcon />
          </NavItem>
          <NavItemProx textButton={"Elements"} to={"/elements"}>
            <ElementsIcon />
          </NavItemProx>

          <NavItemProx to={"/headers"} textButton={"Headers"}>
            <HeaderIcon />
          </NavItemProx>
          <NavItemProx to={"/popovers"} textButton={"Popovers"}>
            <PopoverIcon />
          </NavItemProx>
          <NavItemProx to={"/toasts"} textButton={"Toasts"}>
            <ToastIcon />
          </NavItemProx>
          <NavItemProx to={"/tabs"} textButton={"Tabs"}>
            <ToastIcon />
          </NavItemProx>
        </ul>
      </nav>
      <div className="linea"></div>

      <div className="black-mode">
        <div className="info">
          <DarkModeIcon />
          <span className="sidebarSpan">Dark Mode</span>
        </div>
        <div className="switch">
          <label id="toggleSwitch" htmlFor="black-mode">
            <input
              onChange={toggleDarkMode}
              type="checkbox"
              id="black-mode"
              name="black-mode"
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </aside>
  );
}
