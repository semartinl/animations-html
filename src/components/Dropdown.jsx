import React, { useState } from "react";

export default function Dropdown({ dropdownTarget }) {
  const [open, setOpen] = useState(false);

  return (
    <div ref={dropdownTarget} className="dropdown">
      <button className="btn dropdown-btn" popoverTarget="dropdown-container">
        Pulsame para ver la animacion
      </button>
      <div
        id="dropdown-container"
        className="dropdown-container"
        popover="auto"
      >
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
