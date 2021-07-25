export const placesWrapper = document.querySelector('.places');
export const forms = document.querySelectorAll('.popup__form');
export const editButton = document.querySelector('.profile__edit-button');
export const popupProfile = document.querySelector('.popup_type_profile');
export const popupProfileForm = popupProfile.querySelector('.popup__form');
export const nameInput = popupProfileForm.querySelector('.popup__input[name=name]');
export const jobInput = popupProfileForm.querySelector('.popup__input[name=job]');
export const profileName = document.querySelector('.profile__name');
export const profileInfo = document.querySelector('.profile__info');
export const profileAddButton = document.querySelector('.profile__add-button');
export const popupPlace = document.querySelector('.popup_type_place');
export const popupPlaceForm = popupPlace.querySelector('.popup__form');
export const popupPlaceBtnSave = popupPlace.querySelector('.popup__btn-save');
export const popupImage = document.querySelector('.popup_type_image');

export const formConfig = {
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const templateSelector = '#template-place';

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
