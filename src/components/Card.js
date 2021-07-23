class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const newPlace = document.querySelector(this._cardSelector).content.querySelector('.places__item').cloneNode(true);

    this._element = newPlace;
  }

  _setEventListeners() {
    this._element.querySelector('.places__like-button').addEventListener('click', this._handleLikeButton);
    this._element.querySelector('.places__remove-button').addEventListener('click', this._handleRemovePlace);
    this._element.querySelector('.places__image').addEventListener('click', this._handleCardClick);
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle('places__like-button_active');
  }

  _handleRemovePlace(evt) {
    evt.target.closest('.places__item').remove();
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
