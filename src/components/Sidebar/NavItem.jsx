import React from "react";
import { NavLink } from "react-router-dom";

export default function NavItem({ to, textButton, children }) {
  return (
    <li className="nav-item">
      <NavLink to={to} className={({ isActive }) => (isActive ? "active" : "")}>
        {children}
        <span className="sidebarSpan">{textButton}</span>
      </NavLink>
    </li>
  );
}
