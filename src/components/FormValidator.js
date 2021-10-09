class FormValidator {
  constructor(data, formElement) {
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
    this._buttonSubmit = formElement.querySelector(this._submitButtonSelector);
  }

  _setFieldError = (input) => {
    const span = this._formElement.querySelector(`#${input.id}-error`);
    const validity = input.validity;

    span.textContent = input.validationMessage;

    if (!validity.valid) {
      input.classList.add(this._inputErrorClass);
      span.classList.add(this._errorClass);
    } else {
      input.classList.remove(this._inputErrorClass);
      span.classList.remove(this._errorClass);
    }
  }

  _setSubmitButtonState = () => {
    const isValid = this._formElement.checkValidity();

    if (isValid) {
      this._buttonSubmit.classList.remove(this._inactiveButtonClass);
      this._buttonSubmit.removeAttribute('disabled');
    } else {
      this.setSubmitButtonDisabled();
    }
  }

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
  }

  _handleFormInput = (evt) => {
    const input = evt.target;

    this._setFieldError(input);
    this._setSubmitButtonState();
  }

  setSubmitButtonDisabled() {
    this._buttonSubmit.classList.add(this._inactiveButtonClass);
    this._buttonSubmit.setAttribute('disabled', 'disabled');
  }

  enableValidation() {
    this._formElement.addEventListener('submit', this._handleFormSubmit);
    this._formElement.addEventListener('input', this._handleFormInput);
  }

  resetValidation() {
    this._formElement.querySelectorAll('input').forEach((input) => {
      input.classList.remove(this._inputErrorClass);
    });

    this._formElement.querySelectorAll('span').forEach((span) => {
      span.classList.remove(this._errorClass);
      span.textContent = '';
    });
  }
};

export default FormValidator;
