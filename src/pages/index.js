import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api';
import {
  placesWrapper,
  forms,
  editButton,
  popupProfile,
  profileName,
  profileInfo,
  profileAvatar,
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

let cardsList;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-28',
  headers: {
    authorization: 'f77a7956-a5a9-4ad6-a04a-920b557c7dfd',
    'Content-Type': 'application/json'
  }
});

api.getProfileData().then((res) => {
  profileName.textContent = res.name;
  profileInfo.textContent = res.about;
  profileAvatar.src = res.avatar;
});

api.getCardsData().then((res) => {
  cardsList = new Section({
    items: res,
    renderer: (item) => {
      return createCardInstance(item, templateSelector);
  }}, placesWrapper);

  cardsList.renderItems();
});

const popupWithProfileForm = new PopupWithForm(popupProfile, (data) => {
  userInfo.setUserInfo(data);
  api.updateProfileData(data);
});

const popupWithPlaceForm = new PopupWithForm(popupPlace, (data) => {
  createCard(data);
  api.createCardData(data);
});

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
    name: inputValues.name,
    link: inputValues.link,
  }, templateSelector);

  cardsList.addItem(card);
  new FormValidator(formConfig, popupPlaceForm).setSubmitButtonDisabled(popupPlaceBtnSave);
}

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
