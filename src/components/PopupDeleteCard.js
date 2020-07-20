import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor (popupSelector, {formSubmit}) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }

  setEventListeners () {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._formSubmit(this._cardElement, this._cardId);
    });
  }

  open(cardElement, cardId) {
    super.open();

    this._cardElement = cardElement;
    this._cardId = cardId;
  }
}
