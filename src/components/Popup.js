export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClickClose = this._handleOverlayClickClose.bind(this);
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened');
      if (popupOpened) {
        this.close();
      }
    }
  }

  _handleOverlayClickClose (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  open () {
    this._popup.classList.add('popup_opened');

    //close by ESC
    document.addEventListener('keydown', this._handleEscClose);
    //close by ovelay click
    document.addEventListener('click', this._handleOverlayClickClose);
  }

  close () {
    this._popup.classList.remove('popup_opened');

    //close by ESC
    document.removeEventListener('keydown', this._handleEscClose);
    //close by ovelay click
    document.removeEventListener('click', this._handleOverlayClickClose);
  }


  setEventListeners () {
    //close by close button
    this._closeButton.addEventListener('click', () => {
      this.close();
    })
  }
}
