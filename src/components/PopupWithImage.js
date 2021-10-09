import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;
    this._popupPlaceImage = popupSelector.querySelector('.popup__place-img');
    this._popupPlaceName = popupSelector.querySelector('.popup__place-name');
  }

  open() {
    super.open();

    this._popupPlaceImage.setAttribute('src', this._link);
    this._popupPlaceImage.setAttribute('alt', this._name);
    this._popupPlaceName.textContent = this._name;
  }
}

export default PopupWithImage;
