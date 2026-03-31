import React from "react";
import AnimationElementComplex from "./AnimationElementComplex";

export default function ListAnimationElementComplex({
  filteredList,
  target,
  setSelectedAnim,
}) {
  return (
    <div className="animations-list">
      {filteredList.length === 0 ? (
        <p>No hay ninguna animacion</p>
      ) : (
        filteredList.map((animation, index) => (
          <AnimationElementComplex
            key={animation.id}
            targetElement={target}
            animationName={`${animation.cssValue}`}
            titleAnimation={animation.id}
            descriptionAnimation={animation.description}
            isActive={index === 0 ? true : false}
            onOpenCopy={() => setSelectedAnim(animation)}
          />
        ))
      )}
    </div>
  );
}
