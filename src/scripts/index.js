import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';
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
const popupPlaceBtnSave = popupPlace.querySelector('.popup__btn-save');
const popupImage = document.querySelector('.popup_type_image');

const userInfo = new UserInfo({
  userNameSelector: profileName,
  userInfoSelector: profileInfo,
});

const popupWithProfileForm = new PopupWithForm(popupProfile, userInfo.setUserInfo);
const popupWithPlaceForm = new PopupWithForm(popupPlace, createCard);
popupWithProfileForm.setEventListeners();
popupWithPlaceForm.setEventListeners();

function getProfileValues() {
  const userInfoValues = userInfo.getUserInfo();
  nameInput.value = userInfoValues.userName;
  jobInput.value = userInfoValues.userInfo;
}

function createCard(inputValues) {
  const newCard = new Card({
    name: inputValues.placeName,
    link: inputValues.placeLink,
  }, '#template-place', () => {
    const popupWithImage = new PopupWithImage(popupImage, {
      name: inputValues.placeName,
      link: inputValues.placeLink,
    });
    popupWithImage.open();
    popupWithImage.setEventListeners();
  }).createCard();

  placesWrapper.prepend(newCard);
  popupPlaceBtnSave.setAttribute('disabled', 'disabled');
  popupPlaceBtnSave.classList.add('popup__btn-save_disabled');
}

editButton.addEventListener('click', () => {
  popupWithProfileForm.open();
  getProfileValues();
});

profileAddButton.addEventListener('click', () => {
  popupWithPlaceForm.open();
})

new Section({
  items: initialCards,
  renderer: (item) => {
  const card = new Card(item, '#template-place', () => {
    const popupWithImage = new PopupWithImage(popupImage, item);
    popupWithImage.open();
    popupWithImage.setEventListeners();
  });
  return card.createCard();
}}, placesWrapper).renderItems();

forms.forEach((form) => {
  new FormValidator({
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }, form).enableValidation();
})
