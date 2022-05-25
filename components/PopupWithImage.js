import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector('.popup-images__img');
    this._captionElement = this._popup.querySelector('.popup-images__title');
  }
// вставить картинку с подписью
  open(data) {
    super.open();
    this._imageElement.src = data.link;
    this._imageElement.alt = data.name;
    this._captionElement.textContent = data.name;
  }
}