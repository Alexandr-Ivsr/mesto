import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './constants.js';

const placesWrapper = document.querySelector('.places');
const forms = document.querySelectorAll('.popup__form');
const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileBtnClose = popupProfile.querySelector('.popup__btn-close');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const nameInput = popupProfileForm.querySelector('.popup__input[name=name]');
const jobInput = popupProfileForm.querySelector('.popup__input[name=job]');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');
const profileAddButton = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup_type_place')
const popupPlaceBtnClose = popupPlace.querySelector('.popup__btn-close');
const popupPlaceForm = popupPlace.querySelector('.popup__form');
const popupPlaceBtnSave = popupPlace.querySelector('.popup__btn-save');
const placeNameInput = popupPlaceForm.querySelector('.popup__input[name=placeName]');
const placeLink = popupPlaceForm.querySelector('.popup__input[name=placeLink]');
const popupImage = document.querySelector('.popup_type_image');
const popupImageBtnClose = popupImage.querySelector('.popup__btn-close');

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupOverlay(popup) {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  })
}

function closePopupEsc(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}

function getProfileValues() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;

  closePopup(popupProfile);
}

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

editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  getProfileValues();
});

popupProfileForm.addEventListener('submit', handleProfileFormSubmit);

profileAddButton.addEventListener('click', () => {
  openPopup(popupPlace)
});

popupProfileBtnClose.addEventListener('click', () => {
  closePopup(popupProfile);
});

popupPlaceBtnClose.addEventListener('click', () => {
  closePopup(popupPlace);
});

popupImageBtnClose.addEventListener('click', () => {
  closePopup(popupImage);
});

popupPlaceForm.addEventListener('submit', handlePlaceFormSubmit);

closePopupOverlay(popupProfile);
closePopupOverlay(popupPlace);
closePopupOverlay(popupImage);

initialCards.forEach((item) => {
  const card = new Card(item, '#template-place');
  const newCard = card.createCard();

  placesWrapper.prepend(newCard);

})

forms.forEach((form) => {
  new FormValidator({
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_disabled',
    inputErrorClass: 'popup__input_type_error',
  }, form).enableValidation();
})
