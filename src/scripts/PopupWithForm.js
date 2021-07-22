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

  setEventListeners = () => {
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    })

    this._popupSelector.querySelector('.popup__btn-close').addEventListener('click', this.close);

    this._popupSelector.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callback(this._getInputValues());
      this.close();
      evt.target.reset();
    });
  }
}

export default PopupWithForm;
