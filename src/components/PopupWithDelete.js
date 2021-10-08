import Popup from './Popup.js';

class PopupWithDelete extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._callback = callback;
  }

  open(id, deleteCard) {
    super.open();

    this._id = id;
    this._deleteCard = deleteCard;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupSelector.querySelector('.popup__btn-save').addEventListener('click', () => {
      this._callback(this._id, this._deleteCard);
      this.close();
    });
  }
}

export default PopupWithDelete;
