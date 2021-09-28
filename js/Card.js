import { openPopupImages } from './index.js'

class Card{
    constructor(data, cardSelector){
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate = () => {
        const cardTemplate = document.querySelector('.template-cards').content.firstElementChild.cloneNode(true);
        return cardTemplate;
    }
    _activeLike = () => {
        this._element.querySelector('.cards__link').classList.toggle('cards__link-active');
    }
    _removeCard = () => {
        this._element.querySelector('.cards__close').closest('.cards__item').remove();
    }
    // Добавление обработчиков
    _setEventListeners = () => {
        this._element.querySelector('.cards__link').addEventListener('click', () => {
            this._activeLike();
          });
        this._element.querySelector('.cards__close').addEventListener('click', () => {
            this._removeCard();
          });
          this._element.querySelector('.cards__image').addEventListener('click', () => { openPopupImages(this._link, this._name) });
    }
    generateCard = () => {
        this._element = this._getTemplate();
        this._setEventListeners();
    
        this._element.querySelector('.cards__image').src = this._link;
        this._element.querySelector('.cards__image').alt = this._name;
        this._element.querySelector('.cards__title').textContent = this._name;
    
        return this._element;
    }
};
export {Card};