export class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
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
    _toggleButtonState(inputList) {
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

        if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.disabled = true;
        } else {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.disabled = false;
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
        this._toggleButtonState(inputList);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState(inputList);
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

