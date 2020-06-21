export class Card {
  constructor (link, name, templateSelector, handleCardClick) {
    this._link = link;
    this._name = name;
    this._templateSelector = templateSelector;
    this._openImagePopap = handleCardClick;
  }

  _getCardElement () {
    const cardElement = document.querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  //like
  _likeImage () {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  //delete card
  _removeCardElement () {
    this._element.remove();
  }

  _setEventListeners () {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._likeImage();
    })

    this._element.querySelector('.card__recycle-bin').addEventListener('click', () => {
      this._removeCardElement();
    })

    //open image popup
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._openImagePopap();
    })
  }

  generateCard () {
    this._element = this._getCardElement();
    this._setEventListeners();
    const cardImage = this._element.querySelector('.card__image'); //!!!!!!!!!!!!!!!!!!
    cardImage.src = this._link;
    cardImage.alt = 'Фотография места ' + this._name;
    this._element.querySelector('.card__subscription').textContent = this._name;

    return this._element
  }

}
