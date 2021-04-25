let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__btn-close');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let nameInput = popupForm.querySelector('.popup__input[name=name]');
let jobInput = popupForm.querySelector('.popup__input[name=job]');
let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__info');

function showPopup() {
  popup.classList.add('popup_opened');
  getProfileValues();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function getProfileValues() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;

  closePopup();
}

editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);
document.addEventListener('keydown', function(evt) {
  if (evt.code === 'Escape') {
    closePopup();
  }
})
popup.addEventListener('keydown', function(evt) {
  if (evt.code === 'Enter') {
    formSubmitHandler(evt);
  }
})
