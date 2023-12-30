import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = "";
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="change-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        type="url"
        name="link"
        className="popup__text popup__text_type_avatar-link"
        id="avatar-link"
        placeholder="Ссылка на новый аватар"
        required=""
        ref={avatarRef}
      />
      <span id="avatar-link-error" className="popup__error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
