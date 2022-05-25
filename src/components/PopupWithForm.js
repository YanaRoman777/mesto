import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ handleSubmitForm }, popupSelector) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = this._popup.querySelector('.form');
    this._submitFormCallback = this._submitForm.bind(this);
  }
// собрать данные всех полей формы
  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(data) {
    this._getInputValues();
    Object.assign(this._formValues, data);
    this._inputList.forEach(input => {
      input.value = this._formValues[input.name];
    });
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._handleSubmitForm(this._getInputValues());
  }
  // добавлять обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._submitFormCallback);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._formElement.removeEventListener('submit', this._submitFormCallback);
  }
  // добавим сброс формы при закрытии попапа
  close() {
    super.close();
    this._formElement.reset();
  }
}