import failIcon from "../images/fail-icon.svg";
import successIcon from "../images/success-icon.svg";

function InfoTooltip({ isOpen, onClose, status, message }) {
  const icon = status === "success" ? successIcon : failIcon;

  

  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_infotooltip">
        <img className="popup__icon" src={icon} alt={status === "success" ? "Иконка с галочкой в круге" : "Иконка с крестиком в круге"} />
        <h2 className="popup__title popup__title_type_infotooltip">{message}</h2>
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть окно"
          onClick={onClose}
        />
      </div>
    </section>
  );
}

export default InfoTooltip;
