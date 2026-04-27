import React from "react";
import CaretDown from "../../public/icons/CaretDown";

export default function FilterAnimations({
  selectedType,
  setSelectedType,
  availableTypes,
}) {
  return (
    <div className="filters-animations-container">
      <button
        id="selectedFilter"
        onClick={(e) => {
          e.target.parentElement.classList.toggle("open");
        }}
      >
        <span
          className="typeSelected"
          onClick={(e) => {
            e.target.parentElement.parentElement.classList.toggle("open");
          }}
        >
          {selectedType}
        </span>
        <span
          className="arrow"
          onClick={(e) => {
            e.target.parentElement.parentElement.classList.toggle("open");
          }}
        >
          <CaretDown />
        </span>
      </button>

      <div className="filters-list">
        <ol>
          {availableTypes.map((type, i) => (
            <li
              key={i}
              className={`${type === "Todos" ? "active" : ""}`}
              onClick={(e) => {
                const active = e.target.parentElement.querySelector(".active");
                if (!active || active === e.target) return;
                active.classList.remove("active");
                e.target.classList.add("active");
                setSelectedType(type);
                e.target.parentElement.parentElement.parentElement.classList.toggle(
                  "open",
                );
              }}
            >
              {type}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
