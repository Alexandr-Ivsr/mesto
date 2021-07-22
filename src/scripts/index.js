import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm';
import { initialCards } from './constants.js';

const placesWrapper = document.querySelector('.places');
const forms = document.querySelectorAll('.popup__form');
const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const nameInput = popupProfileForm.querySelector('.popup__input[name=name]');
const jobInput = popupProfileForm.querySelector('.popup__input[name=job]');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');
const profileAddButton = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup_type_place')
const popupPlaceForm = popupPlace.querySelector('.popup__form');
const popupPlaceBtnSave = popupPlace.querySelector('.popup__btn-save');
const placeNameInput = popupPlaceForm.querySelector('.popup__input[name=placeName]');
const placeLink = popupPlaceForm.querySelector('.popup__input[name=placeLink]');
const popupImage = document.querySelector('.popup_type_image');

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}

function getProfileValues() {
  const userInfo = new UserInfo.getProfileValues();
  nameInput.value = userInfo.userName;
  jobInput.value = userInfo.userInfo;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;

  closePopup(popupProfile);
}

// function handleProfileFormSubmit(inputValues) {
//   profileName.textContent = inputValues.name;
//   profileInfo.textContent = inputValues.job;
// }

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const newCard = new Card({
    name: placeNameInput.value,
    link: placeLink.value
  }, '#template-place').createCard();
  placesWrapper.prepend(newCard);
  evt.target.reset();
  popupPlaceBtnSave.setAttribute('disabled', 'disabled');
  popupPlaceBtnSave.classList.add('popup__btn-save_disabled');
  closePopup(popupPlace);
}

// function handlePlaceFormSubmit(inputValues) {
//   const newCard = new Card({
//     name: inputValues.placeName,
//     link: inputValues.placeLink
//   }, '#template-place').createCard();
//   placesWrapper.prepend(newCard);
//   popupPlaceBtnSave.setAttribute('disabled', 'disabled');
//   popupPlaceBtnSave.classList.add('popup__btn-save_disabled');
// }

editButton.addEventListener('click', () => {
  new Popup(popupProfile).open();
  getProfileValues();
});

popupProfileForm.addEventListener('submit', handleProfileFormSubmit);

profileAddButton.addEventListener('click', () => {
  new Popup(popupPlace).open();
});

popupPlaceForm.addEventListener('submit', handlePlaceFormSubmit);

new PopupWithForm(popupProfile).setEventListeners();
new PopupWithForm(popupPlace).setEventListeners();
new Popup(popupImage).setEventListeners();

initialCards.forEach((item) => {
  const card = new Card(item, '#template-place', () => {
    new PopupWithImage(popupImage, item).open();
  });
  const newCard = card.createCard();

  placesWrapper.prepend(newCard);
})

forms.forEach((form) => {
  new FormValidator({
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }, form).enableValidation();
})
