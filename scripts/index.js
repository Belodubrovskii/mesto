import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './initialCards.js';
import {Section} from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';

const popup = document.querySelector('.popup');
const editProfileButton = document.querySelector('.profile__edit-btn');

const nameInput = document.querySelector('.popup__form-name');
const activityInput = document.querySelector('.popup__form-activity');

const addCardButton = document.querySelector('.profile__add-btn');
const popupAddCard = document.querySelector('.popup_add-card');

const editFormElement = popup.querySelector('.popup__form');
const addCardFormElement = popupAddCard.querySelector('.popup__form');

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

const userInfo = new UserInfo('.profile__name', '.profile__activity');

const imagePopup = new PopupWithImage('.popup_photo');

imagePopup.setEventListeners();

const editPopup = new PopupWithForm('.popup_profile', {formSubmit: (inputValues) => {
  userInfo.setUserInfo(inputValues.name, inputValues.activity);
  editPopup.close();
}});

editPopup.setEventListeners();

// =============== Add initial cadrs ====================================

const initialCardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const card = new Card (item, '.card-template', {handleCardClick: () => {
      imagePopup.open(item.name, item.link);
    }});
    const cardElement = card.generateCard();

    initialCardList.addItem(cardElement);
    }
  },
  '.cards'
);

initialCardList.renderItems();

//=======================================================================

function createCardItem (data) {
  const card = new Card (data, '.card-template', {handleCardClick: () => {
    imagePopup.open(data.name, data.link);
  }});
  const cardElement = card.generateCard();

  initialCardList.addItem(cardElement);

  addCardPopup.close();
}


const addCardPopup = new PopupWithForm('.popup_add-card', {formSubmit: (data) => {
  createCardItem(data);
  addCardPopup.close();
}});

addCardPopup.setEventListeners();

// open add-card popup
addCardButton.addEventListener('click', () => {
  addCardPopup.open();

  formAddCardValidate.clearErrors();
});

// open edit profile popup
editProfileButton.addEventListener('click', () => {
  editPopup.open()

  const userData = userInfo.getUserInfo()
  nameInput.value = userData.name;
  activityInput.value = userData.activity;

  formEditValidate.clearErrors();
});

// form list enable validation
formEditValidate.enableValidation();
formAddCardValidate.enableValidation();
