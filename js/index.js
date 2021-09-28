import { Card } from './Card.js';
import { FormValidator, configValid } from './FormValidator.js';

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const profileInfoButton = document.querySelector('.profile__info-button');
const profileButton = document.querySelector('.profile__button');
const profileTitle = document.querySelector('.profile__info-title');
const profileSubtitle = document.querySelector('.profile__info-subtitle');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close');
const formElement = document.querySelector('.form');
const nameInput = document.querySelector('#input-name');
const jobInput = document.querySelector('#input-job');
const popupPlaces = document.querySelector('.popup-places');
const closePlacesButton = popupPlaces.querySelector('.popup__close');
const popupContainer = popup.querySelector('.popup__container');
const popupProfile = document.querySelector('.popup-profile');
const formAdd = document.querySelector('#form-add');
const popupNewPlaces = popupPlaces.querySelector('.popup__new-places');

// Открытие попап 
function openPopup (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupOnEsc);
    popup.addEventListener('click', closePopupOnOverlay);
  };

// Открытие попап карточки
function openPopupPlaces () {
    openPopup (popupPlaces)
    resetFormAdd(formAdd)
  };

// Закрытие попапов
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupOnEsc);
    popup.removeEventListener('click', closePopupOnOverlay);
}

// закрытие попап кликом на оверлей
function closePopupOnOverlay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
}
}

// закрытие попап нажатием на esc
function closePopupOnEsc(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

// Открытие модального окна профайла 
function openPopupProfile() {
    openPopup(popupProfile);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }
  
  profileInfoButton.addEventListener('click', openPopupProfile);
  closeButton.addEventListener('click', () => closePopup(popupProfile));
  
  // функция очистки формы карточки
function resetFormAdd(formAdd) {
    formAdd.reset();
  }
  
  // Открытие и закрытие попапа с добавлением карточки
profileButton.addEventListener('click', () => openPopupPlaces());
closePlacesButton.addEventListener('click', () => closePopup(popupPlaces));

const submitEditProfileForm = evt => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupProfile);
}
formElement.addEventListener('submit', submitEditProfileForm);

// добавление карточки на страницу
function renderPlace(elm) {
    const cards = document.querySelector('.cards');
    const popupNewPlaces = new Card(elm, '.template-cards');
  
    const placeElement = popupNewPlaces.generateCard();
    cards.prepend(placeElement);
  }
  
  initialCards.forEach(renderPlace);

// добавляем новую карточку на страницу через форму
const cardsForm = popupNewPlaces.querySelector('.form');
const titleInput = cardsForm.querySelector('[name=title]');
const linkInput = cardsForm.querySelector('[name=link]');

// обработчик отправки формы добавления карты
function submitAddCardForm(evt) {
  evt.preventDefault();
  const newPost = {
    name: titleInput.value,
    link: linkInput.value
  }
  renderPlace(newPost);
  closePopup(popupPlaces);
  resetFormAdd(formAdd);
}
cardsForm.addEventListener('submit', submitAddCardForm);

// открытие / закрытие картинки
const popupImages = document.querySelector('.popup-images');
const imagesButtonClose = popupImages.querySelector('.popup__close');
const popupImagesTitle = popupImages.querySelector('.popup-images__title');
const popupImagesImg = popupImages.querySelector('.popup-images__img');

function openPopupImages(link, name){
  openPopup(popupImages);
  popupImagesImg.src = link;
  popupImagesImg.alt = name;
  popupImagesTitle.textContent = name;
}
imagesButtonClose.addEventListener('click', function(){
  closePopup(popupImages);
});

const editProfileFormValidate = new FormValidator(configValid, popupProfile);
const addPostFormValidate = new FormValidator(configValid, popupNewPlaces);

editProfileFormValidate.enableValidation();
addPostFormValidate.enableValidation();

export { openPopupImages }