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
const popupAddCard = document.querySelector('.popup_add-card');
const content = document.querySelector('.content');
const popupPhoto = document.querySelector('.popup_photo');
const image = document.querySelector('.popup__image');
const imageSubscription = document.querySelector('.popup__image-subscription');

const imageTitleInput = document.querySelector('.popup__form-image-title');
const imageLinkInput = document.querySelector('.popup__form-image-link');

const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.cards');

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


function getCardElement (link, name) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = 'Фотография места ' + name;
  cardElement.querySelector('.card__subscription').textContent = name;

  return cardElement;
}

// =============== Add initial cadrs ====================================

initialCards.forEach( function (item) {
  cardContainer.prepend(getCardElement (item.link, item.name));
});

//=======================================================================

function createCardItem (evt) {
  evt.preventDefault();

  cardContainer.prepend(getCardElement(imageLinkInput.value, imageTitleInput.value));
  popupAddCard.classList.toggle('popup_opened')
}


// ====================== Events ===========================

// open add-card popup
addCardButton.addEventListener('click', function() {
  popupAddCard.classList.toggle('popup_opened');
  imageTitleInput.value = '';
  imageLinkInput.value = '';
});

// open edit profile popup
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

// like
content.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('card__like')) {
    evt.target.classList.toggle('card__like_active');
  }

  return;
});

// detele card (recycle-bin)
content.addEventListener('click', function(evt) {
  if (evt.target.className != 'card__recycle-bin')
  return;

  evt.target.closest('.card').remove();
});

// open image popup
content.addEventListener('click', function(evt) {
  if (evt.target.className != 'card__image')
  return;

  popupPhoto.classList.toggle('popup_opened');
  image.src = evt.target.src;
  imageSubscription.textContent = evt.target.nextElementSibling.textContent;
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener('submit', formSubmitHandler);
placeFormElement.addEventListener('submit', createCardItem);
