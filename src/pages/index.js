import './index.css';
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
  popupPlaceForm,
  popupImage,
  formConfig,
  templateSelector,
  popupPlaceBtnSave,
} from '../utils/constants.js';
import { getProfileValues } from '../utils/utils.js'

export const userInfo = new UserInfo({
  userNameSelector: profileName,
  userInfoSelector: profileInfo,
});

const popupWithProfileForm = new PopupWithForm(popupProfile, userInfo.setUserInfo);
const popupWithPlaceForm = new PopupWithForm(popupPlace, createCard);

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    return createCardInstance(item, templateSelector);
}}, placesWrapper);

function createCardInstance(item, selector) {
  const card = new Card(item, selector, () => {
    const popupWithImage = new PopupWithImage(popupImage, item);
    popupWithImage.open();
    popupWithImage.setEventListeners();
  });
  return card.createCard();
}

function createCard(inputValues) {
  const card = createCardInstance({
    name: inputValues.placeName,
    link: inputValues.placeLink,
  }, templateSelector);

  cardsList.addItem(card);
  new FormValidator(formConfig, popupPlaceForm).setSubmitButtonDisabled(popupPlaceBtnSave);
}

cardsList.renderItems();

forms.forEach((form) => {
  new FormValidator(formConfig, form).enableValidation();
})

popupWithProfileForm.setEventListeners();
popupWithPlaceForm.setEventListeners();

editButton.addEventListener('click', () => {
  popupWithProfileForm.open();
  getProfileValues();
});

profileAddButton.addEventListener('click', () => {
  popupWithPlaceForm.open();
})
