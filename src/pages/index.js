import './index.css';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import {
  initialCards,
  editProfileButton,
  nameInput,
  activityInput,
  addCardButton,
  editFormElement,
  addCardFormElement,
  formValidationOptions
} from '../utils/constants.js';

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
