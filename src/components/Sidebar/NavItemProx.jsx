import React from "react";

export default function NavItemProx({ to, textButton, children }) {
  return (
    <li className="nav-item">
      <button className="btn-soon btn-energy item">
        {children}
        {/* <span className="text sidebarSpan">{textButton}</span> */}
        <span className="badge ">
          Próx: <span className="text">{textButton}</span>
        </span>
        <div className="shimmer"></div>
      </button>
    </li>
  );
}
