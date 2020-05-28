const popup = document.querySelector('.popup');
const editProfile = document.querySelector('.profile__edit-btn');
const closeButton = document.querySelector('.popup__close-button');

const name = document.querySelector('.profile__name')
const activity = document.querySelector('.profile__activity')
const nameInput = document.querySelector('.popup__form-name');
const activityInput = document.querySelector('.popup__form-activity');

const initialCards = [
  {
      name: 'Архызdsfffffffffffffffffffffffffffffffffffffffffffffff fsdkfkds',
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

function openClosePopup() {
  popup.classList.toggle('popup_opened');
  nameInput.value = name.textContent;
  activityInput.value = activity.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    name.textContent = nameInput.value;
    activity.textContent = activityInput.value;

    openClosePopup();
}

// =============== Add initial cadrs ====================================

const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.cards');

function addInitialCards (item) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__subscription').textContent = item.name;
  cardContainer.prepend(cardElement);
}

initialCards.forEach( function (item) {
  addInitialCards (item)
});

//======================================================================




editProfile.addEventListener('click', openClosePopup);
closeButton.addEventListener('click', openClosePopup);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

