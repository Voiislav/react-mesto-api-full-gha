import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [isOpen, currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        type="text"
        name="name"
        value={name || ""}
        onChange={handleChangeName}
        className="popup__text popup__text_type_name"
        id="user-name"
        placeholder="Введите имя"
        required=""
        minLength={2}
        maxLength={40}
      />
      <span id="user-name-error" className="popup__error" />
      <input
        type="text"
        name="job"
        value={description || ""}
        onChange={handleChangeDescription}
        className="popup__text popup__text_type_job"
        id="user-job"
        placeholder="Введите род занятий"
        required=""
        minLength={2}
        maxLength={200}
      />
      <span id="user-job-error" className="popup__error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
