class FormValidator {
  constructor(data, formElement) {
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
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
    const button = this._formElement.querySelector(this._submitButtonSelector);
    const isValid = this._formElement.checkValidity();

    if (isValid) {
      button.classList.remove(this._inactiveButtonClass);
      button.removeAttribute('disabled');
    } else {
      button.classList.add(this._inactiveButtonClass);
      button.setAttribute('disabled', 'disabled');
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

  enableValidation() {
    this._formElement.addEventListener('submit', this._handleFormSubmit);
    this._formElement.addEventListener('input', this._handleFormInput);
  }
};

export default FormValidator;
