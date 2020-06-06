const popup = document.querySelector('.popup');
const editProfileButton = document.querySelector('.profile__edit-btn');

const name = document.querySelector('.profile__name');
const activity = document.querySelector('.profile__activity');
const nameInput = document.querySelector('.popup__form-name');
const activityInput = document.querySelector('.popup__form-activity');

const addCardButton = document.querySelector('.profile__add-btn');
const popupAddCard = document.querySelector('.popup_add-card');

const editFormElement = popup.querySelector('.popup__form');
const addCardFormElement = popupAddCard.querySelector('.popup__form');

const popupPhoto = document.querySelector('.popup_photo');
const image = document.querySelector('.popup__image');
const imageSubscription = document.querySelector('.popup__image-subscription');

const imageTitleInput = document.querySelector('.popup__form-image-title');
const imageLinkInput = document.querySelector('.popup__form-image-link');

const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.cards');

const popupProfileCloseBtn = popup.querySelector('.popup__close-button');
const popupAddCardCloseBtn = popupAddCard.querySelector('.popup__close-button');
const popupPhotoCloseBtn = popupPhoto.querySelector('.popup__close-button');

const formValidationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const inputListEdit = Array.from(editFormElement.querySelectorAll(formValidationOptions.inputSelector));
const inputListAddCard = Array.from(addCardFormElement.querySelectorAll(formValidationOptions.inputSelector));
const SubmitEditButton = popup.querySelector(formValidationOptions.submitButtonSelector);
const SubmitAddCardButton = popupAddCard.querySelector(formValidationOptions.submitButtonSelector);

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

function togglePopup (elem) {
  elem.classList.toggle('popup_opened');
};

function formSubmitHandler (evt) {

  name.textContent = nameInput.value;
  activity.textContent = activityInput.value;

  togglePopup(popup);
};

function openEditPopup () {
    togglePopup (popup);
    nameInput.value = name.textContent;
    activityInput.value = activity.textContent;
    inputListEdit.forEach( (inputElement) =>
      hideInputError(editFormElement, inputElement, formValidationOptions)
    );
    toggleButtonState(inputListEdit, SubmitEditButton, formValidationOptions.inactiveButtonClass);
};

function openAddCardPopup () {
    togglePopup(popupAddCard);
    addCardFormElement.reset();
    inputListAddCard.forEach( (inputElement) =>
      hideInputError(addCardFormElement, inputElement, formValidationOptions)
    );
    toggleButtonState(inputListAddCard, SubmitAddCardButton, formValidationOptions.inactiveButtonClass);
};

function likeImage (evt) {
  evt.target.classList.toggle('card__like_active');
};

function openPhotoPopup (evt) {
  togglePopup(popupPhoto);
  image.src = evt.target.src;
  imageSubscription.textContent = evt.target.nextElementSibling.textContent;
};

function removeCardElement (evt) {
  evt.target.closest('.card').remove();
}

function getCardElement (link, name) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = 'Фотография места ' + name;
  cardElement.querySelector('.card__subscription').textContent = name;

  // open card image
  cardElement.querySelector('.card__image').addEventListener('click', openPhotoPopup);

  // delete card element
  cardElement.querySelector('.card__recycle-bin').addEventListener('click', removeCardElement);

  //like
  cardElement.querySelector('.card__like').addEventListener('click', likeImage);
  return cardElement;
};

// =============== Add initial cadrs ====================================

initialCards.forEach( function (item) {
  cardContainer.prepend(getCardElement (item.link, item.name));
});

//=======================================================================

function createCardItem (evt) {

  cardContainer.prepend(getCardElement(imageLinkInput.value, imageTitleInput.value));
  togglePopup(popupAddCard);
};


// ====================== Events ===========================

// open add-card popup
addCardButton.addEventListener('click', openAddCardPopup);

// open edit profile popup
editProfileButton.addEventListener('click', openEditPopup);

// close any popup

popupProfileCloseBtn.addEventListener('click', () => togglePopup (popup));
popupAddCardCloseBtn.addEventListener('click', () => togglePopup (popupAddCard));
popupPhotoCloseBtn.addEventListener('click', () => togglePopup (popupPhoto));

// close by Esc
function closePopupByEsc (evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    if (popupOpened) {
      popupOpened.classList.remove('popup_opened');
    }
  }
}

document.addEventListener('keydown', closePopupByEsc);


// close popup by overlay click
function closePopupByOverlayClick (evt) {
  if (evt.target.classList.contains('popup_opened')) {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
  }
}

document.addEventListener('click', closePopupByOverlayClick);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener('submit', formSubmitHandler);
addCardFormElement.addEventListener('submit', createCardItem);


enableValidation(formValidationOptions);


