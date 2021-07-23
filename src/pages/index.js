import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import {
  initialCards,
  placesWrapper,
  forms,
  editButton,
  popupProfile,
  profileName,
  profileInfo,
  profileAddButton,
  popupPlace,
  popupPlaceBtnSave,
  popupImage,
} from '../utils/constants.js';
import { getProfileValues } from '../utils/utils.js'


 export const userInfo = new UserInfo({
  userNameSelector: profileName,
  userInfoSelector: profileInfo,
});

const popupWithProfileForm = new PopupWithForm(popupProfile, userInfo.setUserInfo);
const popupWithPlaceForm = new PopupWithForm(popupPlace, createCard);

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

popupWithProfileForm.setEventListeners();
popupWithPlaceForm.setEventListeners();

