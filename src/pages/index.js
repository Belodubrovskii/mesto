import './index.css';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';

import {
  formValidationOptions,
  apiOptions
} from '../utils/constants.js';

const popupProfile = document.querySelector('.popup_profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupEditAvatar = document.querySelector('.popup_edit-avatar');
const popupDeleteConfirm = document.querySelector('.popup_delete-card');

const editProfileSaveBtn = popupProfile.querySelector('.popup__button');
const addCardSaveBtn = popupAddCard.querySelector('.popup__button');
const editAvatarSaveBtn = popupEditAvatar.querySelector('.popup__button');
const deleteConfirmBtn = popupDeleteConfirm.querySelector('.popup__button');

const nameInput = document.querySelector('.popup__form-name');
const activityInput = document.querySelector('.popup__form-activity');

const addCardButton = document.querySelector('.profile__add-btn');
const editProfileButton = document.querySelector('.profile__edit-btn');
const editAvatarButton = document.querySelector('.profile__avatar-edit');

const editFormElement = popupProfile.querySelector('.popup__form');
const addCardFormElement = popupAddCard.querySelector('.popup__form');
const editAvatarFormElement = popupEditAvatar.querySelector('.popup__form');

const formEditValidate = new FormValidator (formValidationOptions, editFormElement);
const formAddCardValidate = new FormValidator (formValidationOptions, addCardFormElement);
const formEditAvatarValidate = new FormValidator (formValidationOptions, editAvatarFormElement);

// const userName = document.querySelector('.profile__name');
// const userAbout = document.querySelector('.profile__activity');
// const userAvatar = document.querySelector('.profile__avatar');

const userInfo = new UserInfo('.profile__name', '.profile__activity', '.profile__avatar');

const imagePopup = new PopupWithImage('.popup_photo');
imagePopup.setEventListeners();

const api = new Api({apiOptions});


Promise.all([api.getUserInfo(),api.getInitialCards()])
  .then(data => {

    //set user info
    userInfo.setUserInfo(data[0].name, data[0].about);
    userInfo.setUserAvatar(data[0].avatar);

    function createCardItem (item) {
      const card = new Card (item, data[0], '.card-template', {handleCardClick: () => {
        imagePopup.open(item.name, item.link);
      },
      handleDeletePopup: (cardElement, cardId) => {
        popupDeleteCard.open(cardElement, cardId);
      },
      handleCardLike: (cardId, likeButton, numberOfLikes) => {
        if (likeButton.classList.contains('card__like_active')) {
          api.addLike(cardId).then(res => numberOfLikes.textContent = res.likes.length);
        } else {
          api.deleteLike(cardId).then(res => numberOfLikes.textContent = res.likes.length)}
      }
      });
      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
    }

    const cardList = new Section (data[1], {renderer: (item) => {
        createCardItem(item);
      }},
      '.cards'
    );

    //render initial cards
    cardList.renderItems();

    // add new card
    const addCardPopup = new PopupWithForm('.popup_add-card', {formSubmit: (item) => {

      addCardSaveBtn.value = 'Сохранение...'
      api.addCard(item)
        .then(res => {
          createCardItem(res);
        })
        .catch(err => console.log(`Ошибка: ${err}`))
        .finally(() => {
          addCardSaveBtn.value = 'Сохранить'
          addCardPopup.close();
        });
    }})

    addCardPopup.setEventListeners();

    // open add-card popup
    addCardButton.addEventListener('click', () => {
      addCardPopup.open();
      formAddCardValidate.clearErrors();
    });

  })
  .catch(err => console.log(`Ошибка: ${err}`));

//=======================================================================

const editProfilePopup = new PopupWithForm('.popup_profile', {formSubmit: (inputValues) => {
  editProfileSaveBtn.value = 'Сохранение...';
  api.updateUserInfo(inputValues.name, inputValues.activity)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about);
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      editProfileSaveBtn.value = 'Сохранить';
      editProfilePopup.close();
    });
}})

editProfilePopup.setEventListeners();

// update avatar
const editAvatarPopup = new PopupWithForm('.popup_edit-avatar', {formSubmit: (inputValues) => {

  editAvatarSaveBtn.value = 'Сохранение...'
  api.updateAvatar(inputValues.avatar)
    .then(res => {
      userInfo.setUserAvatar(res.avatar);
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      editAvatarSaveBtn.value = 'Сохранить';
      editAvatarPopup.close();
    });
}})

editAvatarPopup.setEventListeners();

// ======================================================================

const popupDeleteCard = new PopupDeleteCard('.popup_delete-card', {formSubmit: (cardElement, cardId) => {

  deleteConfirmBtn.classList.add('popup__button_disabled');
  api.deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      deleteConfirmBtn.classList.remove('popup__button_disabled');
      popupDeleteCard.close();
    });
}})

popupDeleteCard.setEventListeners();

//=======================================================================

// open edit profile popup
editProfileButton.addEventListener('click', () => {
  editProfilePopup.open()

  const userItem = userInfo.getUserInfo()
  nameInput.value = userItem.name;
  activityInput.value = userItem.activity;

  formEditValidate.clearErrors();
});

// open edit avatar popup
editAvatarButton.addEventListener('click', () => {
  editAvatarPopup.open()
  formEditAvatarValidate.clearErrors();
});

// form list enable validation
formEditValidate.enableValidation();
formAddCardValidate.enableValidation();
formEditAvatarValidate.enableValidation();
