const popup = document.querySelector('.popup');
const editProfileButton = document.querySelector('.profile__edit-btn');
const closeButton = document.querySelector('.popup__close-button');

const name = document.querySelector('.profile__name')
const activity = document.querySelector('.profile__activity')
const nameInput = document.querySelector('.popup__form-name');
const activityInput = document.querySelector('.popup__form-activity');

const editFormElement = document.querySelector('.popup__form-container');
const placeFormElement = document.querySelector('.popup__place-form-container');

const addCardButton = document.querySelector('.profile__add-btn');
const popupAddCard = document.querySelector('.popup_addCard');
const content = document.querySelector('.content');
const cardLikeButton = document.querySelector('.card__like');


const imageTitleInput = document.querySelector('.popup__form-image-title');
const imageLinkInput = document.querySelector('.popup__form-image-link');

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

function formSubmitHandler (evt) {
    evt.preventDefault();

    name.textContent = nameInput.value;
    activity.textContent = activityInput.value;

    popup.classList.toggle('popup_opened')
}


// =============== Add initial cadrs ====================================

const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.cards');

function addInitialCards (item) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__subscription').textContent = item.name;
  // cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
  //   evt.target.classList.toggle('card__like_active');
  // });
  cardContainer.prepend(cardElement);
}

initialCards.forEach( function (item) {
  addInitialCards (item)
});

//======================================================================

function createCardItem (evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = imageLinkInput.value;
  cardElement.querySelector('.card__subscription').textContent = imageTitleInput.value;

  // cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
  //   evt.target.classList.toggle('card__like_active');
  // });

  cardContainer.prepend(cardElement);


  popupAddCard.classList.toggle('popup_opened')
}

function likeActive (evt) {

}


// ====================== Events ===========================

addCardButton.addEventListener('click', function() {
  popupAddCard.classList.toggle('popup_opened');
  imageTitleInput.value = '';
  imageLinkInput.value = '';
});

editProfileButton.addEventListener('click', function() {
  popup.classList.toggle('popup_opened');
  nameInput.value = name.textContent;
  activityInput.value = activity.textContent;
});

// close any popup
content.addEventListener('click', function(evt) {
  if (evt.target.className != 'popup__close-button')
  return;

  evt.target.closest('.popup').classList.toggle('popup_opened');
  console.log('click');
});

content.addEventListener('click', function(evt) {
  if (evt.target.className != 'card__like')
  return;

  evt.target.classList.toggle('card__like_active');
});

content.addEventListener('click', function(evt) {
  if (evt.target.className != 'card__recycle-bin')
  return;

  evt.target.closest('.card').remove();
});
// cardLikeButton.addEventListener('click', );
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener('submit', formSubmitHandler);
placeFormElement.addEventListener('submit', createCardItem);
