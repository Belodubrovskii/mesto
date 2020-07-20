export class Card {
  constructor (cardProp, templateSelector, {handleCardClick, handleDeletePopup, handleCardLike}) {
    this._link = cardProp.link;
    this._name = cardProp.name;
    this._id = cardProp._id;
    this._likes = cardProp.likes;
    this.userId = '625f0d41c3578d0228f90e62';
    this._ownerId = cardProp.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeletePopup = handleDeletePopup;
    this._handleCardLike = handleCardLike;
    this._isLiked = false;
  }

  _getCardElement () {
    const cardElement = document.querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _toggleLikeColor (evt) {
    evt.target.classList.toggle('card__like_active');
  }

  //delete card
  _openDeletePopup (element, id) {

    this._handleDeletePopup(element, id);
  }

  _setEventListeners () {
    //like
    this.likeButton.addEventListener('click', (evt) => {
      this._toggleLikeColor(evt);
      this._handleCardLike(this._id, this.likeButton, this._numberOfLikes);
    });

    if (this._ownerId == this.userId) {

      this._recycleBin.addEventListener('click', () => this._openDeletePopup(this._element, this._id));
    }

    //open image popup
    this._image.addEventListener('click', this._handleCardClick);
  }

  generateCard () {
    this._element = this._getCardElement();

    this.likeButton = this._element.querySelector('.card__like');

    // check if user has already liked this card
    this._likes.forEach(elem => {
      if (elem._id === this.userId) {
        this._isLiked = true;
        return
      }
    })

    if (this._isLiked) {
      this.likeButton.classList.add('card__like_active');
    }

    this._recycleBin = this._element.querySelector('.card__recycle-bin');
    this._image = this._element.querySelector('.card__image');
    this._numberOfLikes = this._element.querySelector('.card__number-of-likes');

    //delete bin if user did't create this card
    if (this._ownerId !== '625f0d41c3578d0228f90e62') {
      this._recycleBin.remove();
    }

    this._numberOfLikes.textContent = this._likes.length;
    this._image.src = this._link;
    this._image.alt = 'Фотография места ' + this._name;
    this._element.querySelector('.card__subscription').textContent = this._name;

    this._setEventListeners();
    return this._element
  }

}
