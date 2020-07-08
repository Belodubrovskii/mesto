import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._subscription = this._popup.querySelector('.popup__image-subscription');
  }

  open (name, link) {
    super.open();

    this._image.src = link;

    // const cardSubscription = evt.target.closest('.card__subscription').textContent;
    this._image.alt = `Фотография места ${name}`
    this._subscription.textContent = name;
  }
}
