import React, { useId } from "react";

export default function PublishPopover({
  id,
  elementName,
  onSubmit = () => {},
}) {
  const generatedId = useId();
  const popoverId = id || generatedId;

  const handleClose = () => {
    const popover = document.getElementById(popoverId);
    popover?.hidePopover();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = {
      author: formData.get("author") || "",
      title: formData.get("title") || "",
      description: formData.get("description") || "",
      keyframesDetail: formData.get("keyframesDetail") || "",
    };
    onSubmit(payload);
    handleClose();
  };

  return (
    <div popover="auto" id={popoverId} className="code-popover publish-popover">
      <div className="popover-header">
        <h3>Publicar animación {elementName ? `“${elementName}”` : ""}</h3>
        <button className="close-icon" onClick={handleClose}>
          &times;
        </button>
      </div>

      <form className="publish-form" onSubmit={handleSubmit}>
        <label className="form-control">
          <span>Autor (opcional)</span>
          <input
            name="author"
            type="text"
            placeholder="Ej. Ana G. / @anima_dev"
          />
        </label>
        <label className="form-control">
          <span>Título</span>
          <input
            name="title"
            type="text"
            required
            placeholder="Ej. Rebote suave"
            autoFocus
          />
        </label>
        <label className="form-control">
          <span>Descripción breve (qué hace el keyframe)</span>
          <textarea
            name="description"
            rows="4"
            required
            placeholder="Explica en pocas palabras el efecto de la animación y en qué momento del keyframe sucede."
          />
        </label>
        <label className="form-control">
          <span>Detalle de keyframes (paso a paso)</span>
          <textarea
            name="keyframesDetail"
            rows="5"
            placeholder="Ej: 0%: sin escala, 50%: escala 1.08 con sombra, 100%: escala 1 con sombra sutil."
          />
        </label>

        <div className="form-actions">
          <button type="button" className="ghost" onClick={handleClose}>
            Cancelar
          </button>
          <button type="submit" className="primary">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
