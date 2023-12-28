import React from "react";
import basketIcon from "../images/basket_icon.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({
  card,
  name,
  link,
  likes,
  owner,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isLiked = likes.some((i) => i._id === currentUser._id);
  const isOwn = owner._id === currentUser._id;

  const elementLikeClassName = `element__like ${
    isLiked ? "element__like_clicked" : ""
  }`;

  function handleClick() {
    onCardClick({ name, link });
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <figure className="element">
      <button
        type="button"
        className="element__zoom"
        aria-label="Увеличить фото"
        onClick={handleClick}
      ></button>
      {isOwn && (
        <button
          type="button"
          className="element__trash"
          aria-label="Удалить карточку"
          onClick={handleDeleteClick}
        >
          <img src={basketIcon} alt="Иконка мусорной корзины" />
        </button>
      )}
      <img className="element__photo" src={link} alt={`На фото - ${name}`} />
      <figcaption className="element__caption">
        <h2 className="element__title">{name}</h2>
        <div className="element__like-area">
          <button
            type="button"
            className={elementLikeClassName}
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
          ></button>
          <p className="element__likes-number">{likes.length}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default Card;
