export class Card {
  constructor (cardProp, templateSelector, handleCardClick) {
    this._link = cardProp.link;
    this._name = cardProp.name;
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
  _likeImage (cardLikeElement) {
    cardLikeElement.classList.toggle('card__like_active');
  }

  //delete card
  _removeCardElement () {
    this._element.remove();
  }

  _setEventListeners (cardLikeElement, cardImage) {

    cardLikeElement.addEventListener('click', () => {
      this._likeImage(cardLikeElement)
    })

    this._element.querySelector('.card__recycle-bin').addEventListener('click', () => {
      this._removeCardElement();
    })

    //open image popup
    cardImage.addEventListener('click', () => {
      this._openImagePopap();
    })
  }

  generateCard () {
    this._element = this._getCardElement();

    const cardLikeElement = this._element.querySelector('.card__like')
    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = 'Фотография места ' + this._name;
    this._element.querySelector('.card__subscription').textContent = this._name;

    this._setEventListeners(cardLikeElement, cardImage);

    return this._element
  }

}
