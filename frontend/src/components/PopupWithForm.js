function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  onSubmit,
  buttonText,
}) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
    >
      <div className={`popup__container popup__container_type_${name}`}>
        <button
          type="button"
          onClick={onClose}
          className="popup__close"
          aria-label={`Закрыть окно ${title}`}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={`submitForm${name}`}
          noValidate=""
          onSubmit={onSubmit}
        >
          {children}{" "}
          <button
            type="submit"
            name="submitButton"
            aria-label="Сохранить изменения"
            className="popup__submit popup__submit_type_add"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
