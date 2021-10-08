export const placesWrapper = document.querySelector('.places');
export const forms = document.querySelectorAll('.popup__form');
export const editButton = document.querySelector('.profile__edit-button');
export const popupProfile = document.querySelector('.popup_type_profile');
export const popupProfileForm = popupProfile.querySelector('.popup__form');
export const nameInput = popupProfileForm.querySelector('.popup__input[name=name]');
export const aboutInput = popupProfileForm.querySelector('.popup__input[name=about]');
export const profileName = document.querySelector('.profile__name');
export const profileInfo = document.querySelector('.profile__info');
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileAddButton = document.querySelector('.profile__add-button');
export const popupPlace = document.querySelector('.popup_type_place');
export const popupPlaceForm = popupPlace.querySelector('.popup__form');
export const popupPlaceBtnSave = popupPlace.querySelector('.popup__btn-save');
export const popupImage = document.querySelector('.popup_type_image');
export const popupDelete = document.querySelector('.popup_type_delete');
export const popupAvatar = document.querySelector('.popup_type_avatar');
export const popupAvatarButton = document.querySelector('.profile__avatar-button');

export const formConfig = {
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const templateSelector = '#template-place';
