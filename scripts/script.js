const popup = document.querySelector('.popup');
const editProfile = document.querySelector('.profile__edit-btn');
const closeButton = document.querySelector('.popup__close-button');

const name = document.querySelector('.profile__name')
const activity = document.querySelector('.profile__activity')
const nameInput = document.querySelector('.popup__form-name');
const activityInput = document.querySelector('.popup__form-activity');

const formElement = document.querySelector('.popup__form-container');

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


editProfile.addEventListener('click', openClosePopup);
closeButton.addEventListener('click', openClosePopup);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

