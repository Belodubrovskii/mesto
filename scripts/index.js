import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './initialCards.js';

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

const formEditValidate = new FormValidator (formValidationOptions, editFormElement);
const formAddCardValidate = new FormValidator (formValidationOptions, addCardFormElement);


function togglePopup (elem) {
  elem.classList.toggle('popup_opened');
}

function editProfileSubmitHandler () {

  name.textContent = nameInput.value;
  activity.textContent = activityInput.value;

  togglePopup(popup);
}

function openEditPopup () {
    togglePopup (popup);
    nameInput.value = name.textContent;
    activityInput.value = activity.textContent;

    formEditValidate.clearErrors();
}

function openAddCardPopup () {
    togglePopup(popupAddCard);
    addCardFormElement.reset();

    formAddCardValidate.clearErrors();
}

function openImagePopup () {
  togglePopup(popupPhoto);
  image.src = this._element.querySelector('.card__image').src;
  imageSubscription.textContent = this._element.querySelector('.card__subscription').textContent;
}

// =============== Add initial cadrs ====================================

initialCards.forEach((item) => {

  const card = new Card (item.link, item.name, '.card-template', openImagePopup);
  const cardElement = card.generateCard();
  cardContainer.prepend(cardElement);
});


//=======================================================================

function createCardItem () {

  const card = new Card (imageLinkInput.value, imageTitleInput.value, '.card-template', openImagePopup);
  const cardElement = card.generateCard();
  cardContainer.prepend(cardElement);
  togglePopup(popupAddCard);
}


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

// overlay click event
document.addEventListener('click', closePopupByOverlayClick);

// submit events
editFormElement.addEventListener('submit', editProfileSubmitHandler);
addCardFormElement.addEventListener('submit', createCardItem);


// const formList = Array.from(document.querySelectorAll(formValidationOptions.formSelector));


// form list enable validation
formEditValidate.enableValidation();
formAddCardValidate.enableValidation();
// formList.forEach( (formElement) => {
//   const formToValidate = new FormValidator (formValidationOptions, formElement);
//   formToValidate.enableValidation();

// })
