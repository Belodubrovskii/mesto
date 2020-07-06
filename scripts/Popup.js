export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    // this._handleEscClose = _handleEscClose (evt);
    this._closeButton = this._popup.querySelector('.popup__close-button');
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
  }

  close () {
    this._popup.classList.remove('popup_opened');
  }


  setEventListeners () {
    //close by close button
    this._closeButton.addEventListener('click', () => {
      this.close();
    })
    //close by ESC
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    //close by ovelay click
    document.addEventListener('click', this._handleOverlayClickClose.bind(this));
  }
}
