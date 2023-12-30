import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function ConfirmDeletePopup({ isOpen, onClose, onConfirm }) {

  function handleDeleteConfirm(evt) {
    evt.preventDefault();
    onConfirm();
  }

  return (
  <PopupWithForm
    title="Вы уверены?"
    name="confirm"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleDeleteConfirm}
    buttonText="Да"
  />
  )
}

export default ConfirmDeletePopup;
