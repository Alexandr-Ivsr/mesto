const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const profileCloseButton = popupProfile.querySelector('.popup__btn-close');
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
const placesWrapper = document.querySelector('.places');
const templatePlace = document.querySelector('#template-place');
const popupImage = document.querySelector('.popup_type_image');
const popupPlaceImage = popupImage.querySelector('.popup__place-img');
const popupPlaceName = popupImage.querySelector('.popup__place-name');
const popupImageBtnClose = popupImage.querySelector('.popup__btn-close');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
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
  createCard(placeNameInput.value, placeLink.value);
  evt.target.reset();
  popupPlaceBtnSave.setAttribute('disabled', 'disabled');
  popupPlaceBtnSave.classList.add('popup__btn-save_disabled');
  closePopup(popupPlace);
}

function getCard(name, link) {
  const newPlace = templatePlace.content.querySelector('.places__item').cloneNode(true);
  const newPlaceImage = newPlace.querySelector('.places__image');
  const newPlaceRemoveBtn = newPlace.querySelector('.places__remove-button');
  const newPlaceLikeBtn = newPlace.querySelector('.places__like-button');

  newPlace.querySelector('.places__name').textContent = name;
  newPlaceImage.setAttribute('src', link);
  newPlaceImage.setAttribute('alt', name);

  newPlaceLikeBtn.addEventListener('click', handleLikeButton);

  newPlaceImage.addEventListener('click', () => {
    handleOpenImagePopup(name, link);
  });

  newPlaceRemoveBtn.addEventListener('click', handleRemovePlace);

  return newPlace;
}

function createCard(name, link) {
  const newPlace = getCard(name, link);
  placesWrapper.prepend(newPlace);
}

function handleOpenImagePopup(name, link) {
  openPopup(popupImage);
  getPlaceValues(name, link);
}

function getPlaceValues(name, link) {
  popupPlaceImage.setAttribute('src', link);
  popupPlaceImage.setAttribute('alt', name);
  popupPlaceName.textContent = name;
}

function handleLikeButton(evt) {
  evt.target.classList.toggle('places__like-button_active');
}

function handleRemovePlace(evt) {
  evt.target.closest('.places__item').remove();
}

editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  getProfileValues();
});

profileCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

popupProfileForm.addEventListener('submit', handleProfileFormSubmit);

profileAddButton.addEventListener('click', () => {
  openPopup(popupPlace)
});

popupPlaceBtnClose.addEventListener('click', () => {
  closePopup(popupPlace);
});

popupPlaceForm.addEventListener('submit', handlePlaceFormSubmit);

popupImageBtnClose.addEventListener('click', () => {
  closePopup(popupImage);
});

closePopupOverlay(popupProfile);
closePopupOverlay(popupPlace);

initialCards.forEach(function(item) {
  createCard(item.name, item.link);
})
