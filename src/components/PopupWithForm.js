import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._callback = callback;
  }

  _getInputValues = () => {
    this._inputValues = {};
    this._popupSelector.querySelectorAll('.popup__input').forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupSelector.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callback(this._getInputValues());
      this.close();
      evt.target.reset();
    });
  }
}

export default PopupWithForm;
