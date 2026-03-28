import React, { useState } from "react";

export default function Dropdown({ dropdownTarget }) {
  const [open, setOpen] = useState(false);
  const handleClick = (e) => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  const handleClickOutside = (e) => {
    if (dropdownTarget.current && !dropdownTarget.current.contains(e.target)) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownTarget}
      className={`dropdown ${open ? "open" : ""}`}
      onClick={(e) => handleClick(e)}
    >
      <button className="dropdown-btn">Pulsame para ver la animacion</button>
      <div className="dropdown-container">
        <ol>
          <li>
            <a className="dropdown-item" href="#">
              Sostenibilidad
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Coches compartidos
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Pagos
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Sobre nosotros
            </a>
          </li>
        </ol>
      </div>
    </div>
  );
}
