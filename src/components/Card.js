class Card {
  constructor(data, cardSelector, handleCardClick, handlePopupModalDelete, handleLikeButton, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handlePopupModalDelete = handlePopupModalDelete;
    this._handleLikeButton = handleLikeButton;
    this._userId = userId;
  }

  _getTemplate() {
    const newPlace = document.querySelector(this._cardSelector).content.querySelector('.places__item').cloneNode(true);

    this._element = newPlace;
  }

  _setEventListeners() {
    this._element.querySelector('.places__like-button').addEventListener('click', (evt) => {
      this._handleLikeButton(evt, this._element);
    });
    this._element.querySelector('.places__remove-button').addEventListener('click', () => {
      this._handlePopupModalDelete(this._element);
    });
    this._element.querySelector('.places__image').addEventListener('click', this._handleCardClick);
  }

  createCard() {
    this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector('.places__image');
    const cardLikeNumber = this._element.querySelector('.places__like-number');

    this._element.querySelector('.places__name').textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    cardLikeNumber.textContent = this._likes.length;

    if (this._userId !== this._owner._id) {
      this._element.querySelector('.places__remove-button').remove();
    }

    this._likes.forEach((user) => {
      if (user._id === this._userId) {
        this._element.querySelector('.places__like-button').classList.add('places__like-button_active');
      }
    })

    return this._element;
  }
}

export default Card;
