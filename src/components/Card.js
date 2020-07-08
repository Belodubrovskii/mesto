export class Card {
  constructor (cardProp, templateSelector, {handleCardClick}) {
    this._link = cardProp.link;
    this._name = cardProp.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getCardElement () {
    const cardElement = document.querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  //like
  _likeImage (evt) {
    evt.target.classList.toggle('card__like_active');
  }

  //delete card
  _deleteCard () {
    this._element.remove();
    this._element = null;  //delete reference to element
  }

  _setEventListeners () {

    this._like.addEventListener('click', this._likeImage);
    this._recycleBin.addEventListener('click', () => this._deleteCard());

    //open image popup
    this._image.addEventListener('click', this._handleCardClick);
  }

  generateCard () {
    this._element = this._getCardElement();

    this._like = this._element.querySelector('.card__like');
    this._recycleBin = this._element.querySelector('.card__recycle-bin');
    this._image = this._element.querySelector('.card__image');

    this._image.src = this._link;
    this._image.alt = 'Фотография места ' + this._name;
    this._element.querySelector('.card__subscription').textContent = this._name;

    this._setEventListeners();
    return this._element
  }

}
