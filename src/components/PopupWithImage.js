import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;
  }

  open() {
    super.open();

    const popupPlaceImage = this._popupSelector.querySelector('.popup__place-img');
    const popupPlaceName = this._popupSelector.querySelector('.popup__place-name');

    popupPlaceImage.setAttribute('src', this._link);
    popupPlaceImage.setAttribute('alt', this._name);
    popupPlaceName.textContent = this._name;
  }
}

export default PopupWithImage;
