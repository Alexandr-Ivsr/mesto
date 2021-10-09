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
  editButton,
  popupProfile,
  popupProfileForm,
  profileAvatar,
  profileAddButton,
  popupPlace,
  popupPlaceForm,
  popupImage,
  popupDelete,
  popupAvatar,
  popupAvatarForm,
  popupAvatarButton,
  formConfig,
  templateSelector,
} from '../utils/constants.js';
import { getProfileValues } from '../utils/utils.js'

export const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__info',
  userAvatarSelector: '.profile__avatar',
});

let cardsList;
let userId;

const placeFormValidation = new FormValidator(formConfig, popupPlaceForm);
const profileFormValidation = new FormValidator(formConfig, popupProfileForm);
const avatarFormValidation = new FormValidator(formConfig, popupAvatarForm);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-28',
  headers: {
    authorization: 'f77a7956-a5a9-4ad6-a04a-920b557c7dfd',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getProfileData(), api.getCardsData()])
  .then((responses) => {
    userInfo.setUserInfo(responses[0]);

    userId = responses[0]._id;

    cardsList = new Section({
      items: responses[1],
      renderer: (item) => {
        return createCardInstance(item, templateSelector);
    }}, placesWrapper);

    cardsList.renderItems();
  })
  .catch((error) => {
    console.log(error);
  });

const popupWithProfileForm = new PopupWithForm(popupProfile, (data, evt) => {
  popupWithProfileForm.renderLoading(true, "Сохранение...");
  api.updateProfileData(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupWithProfileForm.renderLoading(false, "Сохранить");
      popupWithProfileForm.close();
      evt.target.reset();
    })
    .catch((error) => {
      console.log(error);
    });
});

const popupWithPlaceForm = new PopupWithForm(popupPlace, (data, evt) => {
  popupWithPlaceForm.renderLoading(true, "Сохранение...");
  api.createCardData(data)
    .then((data) => {
      createCard(data);
      popupWithPlaceForm.renderLoading(false, "Создать");
      popupWithPlaceForm.close();
      evt.target.reset();
    })
    .catch((error) => {
      console.log(error);
    });
});

const popupWithAvatarForm = new PopupWithForm(popupAvatar, (data, evt) => {
  popupWithAvatarForm.renderLoading(true, "Сохранение...");
  api.updateProfileAvatar(data)
    .then((data) => {
      profileAvatar.src = data.avatar;
      popupWithAvatarForm.renderLoading(false, "Сохранить");
      popupWithAvatarForm.close();
      evt.target.reset();
    })
    .catch((error) => {
      console.log(error);
    });
});

const popupWithDelete = new PopupWithDelete(popupDelete, (id, deleteCard) => {
  api.deleteCardData(id)
    .then(() => {
      deleteCard();
    })
    .catch((error) => {
      console.log(error);
    });
});

const popupWithImage = new PopupWithImage(popupImage);

function handleLikeButton(evt, data, cardElement) {
  function requestLikeCard() {
    api.likeCard(data._id)
      .then((res) => {
        data.likes = res.likes;
        cardElement.querySelector('.places__like-number').textContent = data.likes.length;
        evt.target.classList.add('places__like-button_active');
      })
      .catch((error) => {
        console.log(error);
      })
  }

  if (data.likes.length !== 0) {
    const likes = data.likes.map((item) => item._id);
    if (likes.includes(userId)) {
      api.dislikeCard(data._id)
        .then((res) => {
          data.likes = res.likes;
          cardElement.querySelector('.places__like-number').textContent = data.likes.length;
          evt.target.classList.remove('places__like-button_active');
        })
        .catch((error) => {
          console.log(error);
        })
    } else {
      requestLikeCard();
    }
  } else {
    requestLikeCard();
  }
}

function createCardInstance(data, selector) {
  const card = new Card(data, selector, () => {
    popupWithImage.open(data);
  }, (cardElement) => {
    popupWithDelete.open(data._id, () => cardElement.remove());
  }, (evt, cardElement) => {
    handleLikeButton(evt, data, cardElement);
  }, userId);

  return card.createCard();
};

function createCard(data) {
  const card = createCardInstance(data, templateSelector);

  cardsList.addItem(card);
  placeFormValidation.setSubmitButtonDisabled();
}

placeFormValidation.enableValidation();
profileFormValidation.enableValidation();
avatarFormValidation.enableValidation();

popupWithProfileForm.setEventListeners();
popupWithPlaceForm.setEventListeners();
popupWithDelete.setEventListeners();
popupWithAvatarForm.setEventListeners();
popupWithImage.setEventListeners();

editButton.addEventListener('click', () => {
  profileFormValidation.resetValidation();
  popupWithProfileForm.open();
  getProfileValues();
});

profileAddButton.addEventListener('click', () => {
  placeFormValidation.resetValidation();
  popupWithPlaceForm.open();
})

popupAvatarButton.addEventListener('click', () => {
  avatarFormValidation.resetValidation();
  popupWithAvatarForm.open();
})
