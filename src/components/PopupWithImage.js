import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPlaceImage = popupSelector.querySelector('.popup__place-img');
    this._popupPlaceName = popupSelector.querySelector('.popup__place-name');
  }

  open(data) {
    super.open();

    this._data = data;

    this._popupPlaceImage.setAttribute('src', this._data.link);
    this._popupPlaceImage.setAttribute('alt', this._data.name);
    this._popupPlaceName.textContent = this._data.name;
  }
}

export default PopupWithImage;
