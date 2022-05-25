//import { openPopupImages } from '../pages/index.js'

class Card{
    constructor({data, handleCardClick}, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardTemplate = document.querySelector('.template-cards').content.firstElementChild.cloneNode(true);
        return cardTemplate;
    }
    _activeLike() {
        this._element.querySelector('.cards__link').classList.toggle('cards__link-active');
    }
    _removeCard() {
        this._element.querySelector('.cards__close').closest('.cards__item').remove();
    }
    // Добавление обработчиков
    _setEventListeners() {
        this._element.querySelector('.cards__link').addEventListener('click', () => {
            this._activeLike();
          });
        this._element.querySelector('.cards__close').addEventListener('click', () => {
            this._removeCard();
          });
          this._element.querySelector('.cards__image').addEventListener('click', this._handleCardClick.bind(this));
    }
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const cardsImage = this._element.querySelector('.cards__image');
        cardsImage.src = this._link;
        cardsImage.alt = this._name;
        this._element.querySelector('.cards__title').textContent = this._name;
    
        return this._element;
    }
};
export {Card};