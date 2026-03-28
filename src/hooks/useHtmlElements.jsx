import React, { useMemo, useState } from "react";
import data from "@/elementos-html.json";
export default function useHtmlElements({ element = "dropdown" }) {
  const [elementosHtml] = useState(data);
  const [selectedElement, setSelectedElement] = useState(element);

  const selectedList = useMemo(() => {
    const el = elementosHtml.filter((el) => el.element === selectedElement);
    return el;
  }, [selectedElement, elementosHtml]);
  return {
    selectedList,
    setSelectedElement,
    selectedElement,
  };
}
