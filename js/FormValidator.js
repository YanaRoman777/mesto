export class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)); 
      }
    // Функция, которая добавляет класс с ошибкой
    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
      }
    // Функция, которая удаляет класс с ошибкой
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
      }
    // Функция проверки валидности нескольких полей, принимает массив полей
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
      };
    // Функция переключателя кнопки принимает массив полей ввода
    // и элемент кнопки, состояние которой нужно менять
    toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
          this._buttonElement.classList.add(this._inactiveButtonClass);
          this._buttonElement.disabled = true;
        } else {
          this._buttonElement.classList.remove(this._inactiveButtonClass);
          this._buttonElement.disabled = false;
        }
    };
    
    // Функция, которая проверяет валидность поля
    _isValid(inputElement) {
        if (inputElement.validity.valid) {
          this._hideInputError(inputElement);
        } else {
          this._showInputError(inputElement);
        }
      }
    //обработчики
    _setEventListeners = () => {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this.toggleButtonState(inputList);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this.toggleButtonState(inputList);
      });
    });
      };
    
    enableValidation (){
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
          });
        this._setEventListeners();
    }
}