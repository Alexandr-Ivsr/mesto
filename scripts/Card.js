import { openPopup, closePopup } from "./index.js";

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const newPlace = document.querySelector(this._cardSelector).content.querySelector('.places__item').cloneNode(true);

    this._element = newPlace;
  }

  _setEventListeners() {
    this._element.querySelector('.places__like-button').addEventListener('click', this._handleLikeButton);
    this._element.querySelector('.places__remove-button').addEventListener('click', this._handleRemovePlace);
    this._element.querySelector('.places__image').addEventListener('click', this._handleOpenImagePopup);
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle('places__like-button_active');
  }

  _handleRemovePlace(evt) {
    evt.target.closest('.places__item').remove();
  }

  _getPlaceValues() {
    const popupPlaceImage = document.querySelector('.popup_type_image .popup__place-img');
    const popupPlaceName = document.querySelector('.popup_type_image .popup__place-name');

    popupPlaceImage.setAttribute('src', this._link);
    popupPlaceImage.setAttribute('alt', this._name);
    popupPlaceName.textContent = this._name;
  }

  _handleOpenImagePopup = () => {
    openPopup(document.querySelector('.popup_type_image'));
    this._getPlaceValues();
  }

  createCard() {
    this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector('.places__image');

    this._element.querySelector('.places__name').textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    return this._element;
  }
}

export default Card;
