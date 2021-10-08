import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDelete from '../components/PopupWithDelete';
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
  popupDelete,
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
let userId;

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

  userId = res._id;
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
  api.updateProfileData(data)
    .then((data) => {
      userInfo.setUserInfo(data);
    });
});

const popupWithPlaceForm = new PopupWithForm(popupPlace, (data) => {
  api.createCardData(data)
    .then((data) => {
      createCard(data);
    });
});

const popupWithDelete = new PopupWithDelete(popupDelete, (id, deleteCard) => {
  api.deleteCardData(id).then(() => {
    deleteCard();
  });
});

function createCardInstance(data, selector) {
  const card = new Card(data, selector, () => {
    const popupWithImage = new PopupWithImage(popupImage, data);
    popupWithImage.open();
    popupWithImage.setEventListeners();
  }, (cardElement) => {
    popupWithDelete.open(data._id, () => cardElement.remove());
  }, (evt, cardElement) => {
    handleLikeButton(evt, data, cardElement);
  }, userId);

  return card.createCard();
};

function handleLikeButton(evt, data, cardElement) {
  if (data.likes.length !== 0) {
    data.likes.forEach((item) => {
      if (item._id === userId) {
        console.log(data.likes)
        api.dislikeCard(data._id)
          .then((res) => {
            data.likes = res.likes;
            cardElement.querySelector('.places__like-number').textContent = data.likes.length;
            evt.target.classList.remove('places__like-button_active');
            return;
          })
      } else {
        console.log(data.likes)
        api.likeCard(data._id)
          .then((res) => {
            data.likes = res.likes;
            cardElement.querySelector('.places__like-number').textContent = data.likes.length;
            evt.target.classList.add('places__like-button_active');
            return;
          })
      }
    })
  } else {
    api.likeCard(data._id)
      .then((res) => {
        data.likes = res.likes;
        cardElement.querySelector('.places__like-number').textContent = data.likes.length;
        evt.target.classList.add('places__like-button_active');
      })
  }
}

function createCard(data) {
  const card = createCardInstance(data, templateSelector);

  cardsList.addItem(card);
  new FormValidator(formConfig, popupPlaceForm).setSubmitButtonDisabled(popupPlaceBtnSave);
}

forms.forEach((form) => {
  new FormValidator(formConfig, form).enableValidation();
})

popupWithProfileForm.setEventListeners();
popupWithPlaceForm.setEventListeners();
popupWithDelete.setEventListeners();

editButton.addEventListener('click', () => {
  popupWithProfileForm.open();
  getProfileValues();
});

profileAddButton.addEventListener('click', () => {
  popupWithPlaceForm.open();
})
