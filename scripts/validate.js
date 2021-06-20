function enableValidation(config) {
  const form = document.querySelector(config.formSelector);
  form.addEventListener('submit', handleFormSubmit);
  form.addEventListener('input', (evt) => {
    handleFormInput(evt, config);
  });
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  const form = evt.currentTarget;
}

function handleFormInput(evt, config) {
  const input = evt.target;
  const form = evt.currentTarget;

  setCustomError(input, config);
  setFieldError(input);
  setSubmitButtonState(form, config);
}

function setCustomError(input, config) {
  const validity = input.validity;

  if (!validity.valid) {
    input.classList.add(config.inputErrorClass);
  } else {
    input.classList.remove(config.inputErrorClass);
  }

  input.setCustomValidity("");

  if (validity.tooShort || validity.tooLong) {
    const currentLength = input.value.length;

    const max = input.getAttribute('maxlength');
    const min = input.getAttribute('minlength');
    input.setCustomValidity(`Строка имеет неверную длину. Введено ${currentLength}, а должно быть от ${min} до ${max}`);
  }

  if (validity.typeMismatch) {
    input.setCustomValidity("Не ссылка");
  }
}

function setFieldError(input) {
  const span = document.querySelector(`#${input.id}-error`);
  span.textContent = input.validationMessage;
}

function setSubmitButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  const isValid = form.checkValidity();

  if (isValid) {
    button.classList.remove(config.inactiveButtonClass);
    button.removeAttribute('disabled');
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute('disabled', 'disabled');
  }
}

enableValidation({
  formSelector: '.popup__form[name="popupFormEdit"]',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_invalid',
  inputErrorClass: 'popup__input_type_error',
});

enableValidation({
  formSelector: '.popup__form[name="popupFormPlace"]',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_invalid',
  inputErrorClass: 'popup__input_type_error',
});
