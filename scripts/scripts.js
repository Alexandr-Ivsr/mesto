const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const profileCloseButton = popupProfile.querySelector('.popup__btn-close');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const nameInput = popupProfileForm.querySelector('.popup__input[name=name]');
const jobInput = popupProfileForm.querySelector('.popup__input[name=job]');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  closePopupOverlay(popup);
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}


function closePopupOverlay(popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  })
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(popupProfile);
    closePopup(popupPlace);
  }
}

function getProfileValues() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;

  closePopup(popupProfile);
}

editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  getProfileValues();
});

profileCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

popupProfileForm.addEventListener('submit', profileFormSubmitHandler);

const profileAddButton = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup_type_place')
const popupPlaceBtnClose = popupPlace.querySelector('.popup__btn-close');
const popupPlaceForm = popupPlace.querySelector('.popup__form');
const placeNameInput = popupPlaceForm.querySelector('.popup__input[name=placeName]');
const placeLink = popupPlaceForm.querySelector('.popup__input[name=placeLink]');

profileAddButton.addEventListener('click', () => {
  openPopup(popupPlace)
});

popupPlaceBtnClose.addEventListener('click', () => {
  closePopup(popupPlace);
});

function placeFormSubmitHandler(evt) {
  evt.preventDefault();
  createCard(placeNameInput.value, placeLink.value);
  evt.target.reset();
  closePopup(popupPlace);
}

popupPlaceForm.addEventListener('submit', placeFormSubmitHandler);

const initialCards = [
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

const placesWrapper = document.querySelector('.places');
const templatePlace = document.querySelector('#template-place');
const popupImage = document.querySelector('.popup_type_image');
const popupPlaceImage = popupImage.querySelector('.popup__place-img');
const popupPlaceName = popupImage.querySelector('.popup__place-name');
const popupImageBtnClose = popupImage.querySelector('.popup__btn-close');

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

initialCards.forEach(function(item) {
  createCard(item.name, item.link);
})

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

popupImageBtnClose.addEventListener('click', () => {
  closePopup(popupImage);
});
