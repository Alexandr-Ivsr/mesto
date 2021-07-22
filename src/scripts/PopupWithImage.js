import Popup from '../scripts/Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;
  }

  open = () => {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);

    const popupPlaceImage = this._popupSelector.querySelector('.popup__place-img');
    const popupPlaceName = this._popupSelector.querySelector('.popup__place-name');

    popupPlaceImage.setAttribute('src', this._link);
    popupPlaceImage.setAttribute('alt', this._name);
    popupPlaceName.textContent = this._name;
  }
}

export default PopupWithImage;
