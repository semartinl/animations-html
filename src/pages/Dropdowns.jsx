import React, { useRef, useState } from "react";
import "@/styles/dropdowns.css";
import CopyIcon from "../../public/icons/CopyIcon";
import PlayIcon from "../../public/icons/PlayIcon";
import AnimationElementComplex from "../components/AnimationElements/AnimationElementComplex";
import { useAnimations } from "../hooks/useAnimations";
import CopyPopover from "../components/CopyPopover";
export default function Dropdowns() {
  const dropdownTarget = useRef();
  const { filteredList, setSelectedType, selectedType, availableTypes } =
    useAnimations({
      initialCategory: "dropdown",
    });
  const [selectedAnim, setSelectedAnim] = useState(null);
  return (
    <main id="dropdown-main">
      <h2>Animaciones para tus dropdowns</h2>
      <div className="muestra-dropdown">
        <div ref={dropdownTarget} className="dropdown">
          <button className="dropdown-btn">Haz hover sobre mi</button>
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
      </div>
      <div className="filters-animations-container">
        <button
          id="selectedFilter"
          onClick={(e) => {
            e.target.parentElement.classList.toggle("open");
          }}
        >
          {selectedType}
          <span
            className="arrow"
            onClick={(e) => {
              e.target.parentElement.parentElement.classList.toggle("open");
            }}
          >
            &#8744;
          </span>
        </button>

        <div className="filters-list">
          <ol>
            {availableTypes.map((type) => (
              <li
                className={`${type === "Todos" ? "active" : ""}`}
                onClick={(e) => {
                  const active =
                    e.target.parentElement.querySelector(".active");
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

      <section className="animations-container">
        <h3>Dropdowns</h3>
        <div className="animations-list">
          {filteredList.length === 0 ? (
            <p>No hay ninguna animacion</p>
          ) : (
            filteredList.map((animation, index) => (
              <AnimationElementComplex
                key={animation.id}
                targetElement={dropdownTarget}
                animationName={`${animation.cssValue}`}
                titleAnimation={animation.id}
                descriptionAnimation={animation.description}
                isActive={index === 0 ? true : false}
                onOpenCopy={() => setSelectedAnim(animation)}
              />
            ))
          )}
        </div>
      </section>
      <CopyPopover anim={selectedAnim} />
    </main>
  );
}
