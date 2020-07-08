import './index.css';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import {
  initialCards,
  formValidationOptions
} from '../utils/constants.js';

const popup = document.querySelector('.popup_profile');
const popupAddCard = document.querySelector('.popup_add-card');

const nameInput = document.querySelector('.popup__form-name');
const activityInput = document.querySelector('.popup__form-activity');

const addCardButton = document.querySelector('.profile__add-btn');
const editProfileButton = document.querySelector('.profile__edit-btn');

const editFormElement = popup.querySelector('.popup__form');
const addCardFormElement = popupAddCard.querySelector('.popup__form');

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

function createCardItem (item) {
  const card = new Card (item, '.card-template', {handleCardClick: () => {
    imagePopup.open(item.name, item.link);
  }});
  const cardElement = card.generateCard();

  initialCardList.addItem(cardElement);

}

// =============== Add initial cadrs ====================================

const initialCardList = new Section ({
  items: initialCards,
  renderer: (item) => {
      createCardItem(item);
    }
  },
  '.cards'
);

initialCardList.renderItems();

//=======================================================================

const addCardPopup = new PopupWithForm('.popup_add-card', {formSubmit: (item) => {
  createCardItem(item);
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

  const useritem = userInfo.getUserInfo()
  nameInput.value = useritem.name;
  activityInput.value = useritem.activity;

  formEditValidate.clearErrors();
});

// form list enable validation
formEditValidate.enableValidation();
formAddCardValidate.enableValidation();
