export class Card {
  constructor (cardProp, templateSelector, handleCardClick) {
    this._link = cardProp.link;
    this._name = cardProp.name;
    this._templateSelector = templateSelector;
    this._openImagePopap = handleCardClick.bind(this);
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

  //delete card and events
  _removeCardAndEvents (evt) {
    this._removeEventListeners();
    evt.target.closest('.card').remove();
  }

  _setEventListeners () {

    this._like.addEventListener('click', this._likeImage);
    this._recycleBin.addEventListener('click', this._deleteCard);

    //open image popup
    this._image.addEventListener('click', this._openImagePopap);
  }

  _removeEventListeners () {

    this._like.removeEventListener('click', this._likeImage);
    this._recycleBin.removeEventListener('click', this._deleteCard);
    this._image.removeEventListener('click', this._openImagePopap);
  }

  generateCard () {
    this._element = this._getCardElement();

    this._like = this._element.querySelector('.card__like');
    this._recycleBin = this._element.querySelector('.card__recycle-bin');
    this._image = this._element.querySelector('.card__image');

    this._image.src = this._link;
    this._image.alt = 'Фотография места ' + this._name;
    this._element.querySelector('.card__subscription').textContent = this._name;

    // bind need to use "this" in _removeEventListeners()
    this._deleteCard = this._removeCardAndEvents.bind(this);
    this._setEventListeners();
    return this._element
  }

}
