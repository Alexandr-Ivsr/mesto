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
  profileAvatar,
  profileAddButton,
  popupPlace,
  popupPlaceForm,
  popupImage,
  popupDelete,
  popupAvatar,
  popupAvatarButton,
  formConfig,
  templateSelector,
  popupPlaceBtnSave,
} from '../utils/constants.js';
import { getProfileValues } from '../utils/utils.js'

export const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__info',
  userAvatarSelector: '.profile__avatar',
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

const popupWithProfileForm = new PopupWithForm(popupProfile, (data) => {
  const buttonSave = popupProfile.querySelector('.popup__btn-save');
  buttonSave.textContent = "Сохранение...";
  api.updateProfileData(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      buttonSave.textContent = "Сохранить";
    })
    .catch((error) => {
      console.log(error);
    });
});

const popupWithPlaceForm = new PopupWithForm(popupPlace, (data) => {
  const buttonSave = popupPlace.querySelector('.popup__btn-save');
  buttonSave.textContent = "Сохранение...";
  api.createCardData(data)
    .then((data) => {
      createCard(data);
      buttonSave.textContent = "Создать";
    })
    .catch((error) => {
      console.log(error);
    });
});

const popupWithAvatarForm = new PopupWithForm(popupAvatar, (data) => {
  const buttonSave = popupAvatar.querySelector('.popup__btn-save');
  buttonSave.textContent = "Сохранение...";
  api.updateProfileAvatar(data)
    .then((data) => {
      profileAvatar.src = data.avatar;
      buttonSave.textContent = "Сохранить";
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
popupWithAvatarForm.setEventListeners();

editButton.addEventListener('click', () => {
  popupWithProfileForm.open();
  getProfileValues();
});

profileAddButton.addEventListener('click', () => {
  popupWithPlaceForm.open();
})

popupAvatarButton.addEventListener('click', () => {
  popupWithAvatarForm.open();
})
