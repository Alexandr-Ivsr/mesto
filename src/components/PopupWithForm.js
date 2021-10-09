import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._callback = callback;
    this._buttonSave = popupSelector.querySelector('.popup__btn-save');
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
      this._callback(this._getInputValues(), evt);
    });
  }

  renderLoading(isLoading, textValue) {
    this._buttonSave.textContent = textValue;
    if (isLoading) {
      this._buttonSave.setAttribute('disabled', 'disabled');
      this._buttonSave.classList.add('popup__btn-save_disabled');
    } else {
      this._buttonSave.removeAttribute('disabled');
      this._buttonSave.classList.remove('popup__btn-save_disabled');
    }
  }
}

export default PopupWithForm;
