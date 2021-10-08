import Popup from './Popup.js';

class PopupWithDelete extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._callback = callback;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupSelector.querySelector('.popup__btn-save').addEventListener('click', () => {
      this._callback();
      this.close();
    });
  }
}

export default PopupWithDelete;
