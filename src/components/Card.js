class Card{
    constructor({data, handleCardClick}, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.cards__link');
        // console.log(this._buttonLikeElement);
        this._closeButton = this._element.querySelector('.cards__close');
        this._cardImage = this._element.querySelector('.cards__image');
        this._cardTitle = this._element.querySelector('.cards__title');
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
        return cardTemplate;
    }
    _handleLikeIcon() {
        this._likeButton.classList.toggle('cards__link-active');
    }
    _removeCard() {
        this._element.remove();
    }
    // Добавление обработчиков
    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeIcon();
          });
        this._closeButton.addEventListener('click', () => {
            this._removeCard();
          });
          this._cardImage.addEventListener('click', this._handleCardClick.bind(this));
    }
    generateCard() {
        this._setEventListeners();
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;
    
        return this._element;
    }
};
export {Card};