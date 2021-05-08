const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_profile');
const profileCloseButton = popupProfile.querySelector('.popup__btn-close');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const nameInput = popupProfileForm.querySelector('.popup__input[name=name]');
const jobInput = popupProfileForm.querySelector('.popup__input[name=job]');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function getProfileValues() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;

  closePopup();
}

editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  getProfileValues();
});

profileCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

popupProfileForm.addEventListener('submit', formSubmitHandler);

document.addEventListener('keydown', function(evt) {
  if (evt.code === 'Escape') {
    closePopup(popupProfile);
    closePopup(popupPlace);
  }
})

const profileAddButton = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup_place')
const popupPlaceBtnClose = popupPlace.querySelector('.popup__btn-close');

profileAddButton.addEventListener('click', () => {
  openPopup(popupPlace)
});

popupPlaceBtnClose.addEventListener('click', () => {
  closePopup(popupPlace);
});

