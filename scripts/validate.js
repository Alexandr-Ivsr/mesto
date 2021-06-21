function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    form.addEventListener('submit', handleFormSubmit);
    form.addEventListener('input', (evt) => {
      handleFormInput(evt, config);
    });
  })
}

function handleFormSubmit(evt) {
  evt.preventDefault();
}

function handleFormInput(evt, config) {
  const input = evt.target;
  const form = evt.currentTarget;

  setCustomError(input, config);
  setFieldError(input, form);
  setSubmitButtonState(form, config);
}

function setCustomError(input, config) {
  const validity = input.validity;

  input.setCustomValidity("");

  if (validity.tooShort || validity.tooLong) {
    const currentLength = input.value.length;

    const max = input.getAttribute('maxlength');
    const min = input.getAttribute('minlength');
    input.setCustomValidity(`Строка имеет неверную длину. Введено ${currentLength}, а должно быть от ${min} до ${max}`);
  }

  if (validity.valueMissing) {
    input.setCustomValidity("Вы пропустили это поле.");
  }

  if (validity.typeMismatch) {
    input.setCustomValidity("Введите адрес сайта.");
  }

  if (!validity.valid) {
    input.classList.add(config.inputErrorClass);
  } else {
    input.classList.remove(config.inputErrorClass);
  }
}

function setFieldError(input, form) {
  const span = form.querySelector(`#${input.id}-error`);
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
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
});
