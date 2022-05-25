import { Card } from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section  from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { configValid } from "../utils/constant.js";


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
// const profileTitle = document.querySelector('.profile__info-title');
// const profileSubtitle = document.querySelector('.profile__info-subtitle');
const popupProfile = document.querySelector('#popup-profile');
// const closeButtonProfile = popupProfile.querySelector('.popup__close');
// const formElementProfile = document.querySelector('.form_profile');
// const nameInput = document.querySelector('#input-name');
// const jobInput = document.querySelector('#input-job');
const popupPlaces = document.querySelector('.popup-places');
//const closePlacesButton = popupPlaces.querySelector('.popup__close');
//const formAdd = document.querySelector('#form-add');
const popupNewPlaces = popupPlaces.querySelector('.popup__new-places');
//const cards = document.querySelector('.cards'); 
const editProfileFormValidate = new FormValidator(configValid, popupProfile);
const addPostFormValidate = new FormValidator(configValid, popupNewPlaces);

// editProfileFormValidate.enableValidation();
// addPostFormValidate.enableValidation();
// // Открытие попап 
// function openPopup (popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', closePopupOnEsc);
//     popup.addEventListener('click', closePopupOnOverlay);
//   };
// // Открытие попап карточки
// function openPopupPlaces () {
//     openPopup (popupPlaces)
//     formAdd.reset();
    
//     //addPostFormValidate.toggleButtonState(); 
//   };

// // Закрытие попапов
// function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closePopupOnEsc);
//     popup.removeEventListener('click', closePopupOnOverlay);
// }

// // закрытие попап кликом на оверлей
// function closePopupOnOverlay(evt) {
//   if (evt.target.classList.contains('popup_opened')) {
//       closePopup(evt.target);}
// }

// // закрытие попап нажатием на esc
// function closePopupOnEsc(evt) {
//     if (evt.key === 'Escape') {
//         const popupOpened = document.querySelector('.popup_opened');
//         closePopup(popupOpened);
//     }
// }

// // Открытие модального окна профайла 
// function openPopupProfile() {
//     openPopup(popupProfile);
//     nameInput.value = profileTitle.textContent;
//     jobInput.value = profileSubtitle.textContent;
//   }
  
//   profileInfoButton.addEventListener('click', openPopupProfile);
//   closeButtonProfile.addEventListener('click', () => closePopup(popupProfile));
  
//   // Открытие и закрытие попапа с добавлением карточки
// profileButton.addEventListener('click', () => openPopupPlaces());
// closePlacesButton.addEventListener('click', () => closePopup(popupPlaces));

// const submitEditProfileForm = evt => {
//     evt.preventDefault();
//     profileTitle.textContent = nameInput.value;
//     profileSubtitle.textContent = jobInput.value;
//     closePopup(popupProfile);
// }
// formElementProfile.addEventListener('submit', submitEditProfileForm);


// // создаем карточку

// function createCard(elm) {
  
//   const popupNewPlaces = new Card(elm, '.template-cards');
//   const placeElement = popupNewPlaces.generateCard();
//   return placeElement;
// } 

//   // добавление карточки на страницу 
// function renderPlace(elm) {
//     const cards = document.querySelector('.cards');
//     cards.prepend(createCard(elm)); 
//   }
  
// initialCards.forEach(renderPlace);



// const userNameSelector = document.querySelector('.profile__info-title');
// const userAboutSelector = document.querySelector('.profile__info-subtitle');

const userNameSelector = '.profile__info-title';
const userAboutSelector = '.profile__info-subtitle';


const userInfo = new UserInfo( userNameSelector, userAboutSelector );

profileInfoButton.addEventListener('click', openPopupProfile);



function openPopupProfile() {
  const popupEditProfile = new PopupWithForm({
    handleSubmitForm: (item) => {
      userInfo.setUserInfo(item);
      //console.log(userInfo.setUserInfo(item));
      popupEditProfile.close();
    }
  }, '.popup-profile');
  //debugger;
  //console.log(userInfo.setUserInfo(item));
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  editProfileFormValidate.enableValidation();
  popupEditProfile.open();
}


const popupImages = document.querySelector('.popup-images');
// обработчик клика по карточке
function handleCardClick(data) {
  const popup = new PopupWithImage('.popup-images');
  popup.open(data);
}

// вызов генерации карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    // Создадим экземпляр карточки
    const cardElm = new Card({
      data: item,
      handleCardClick: () => handleCardClick(item)
    }, '.cards__item');
    // Создаём карточку и возвращаем наружу
    const cardElement = cardElm.generateCard();
    // добавляем карточку в DOM
    cardList.addItem(cardElement);
  }
}, '.cards');
// вызов отрисовки всех карточек на странице 
cardList.rendererItems();

  
//   // Открытие и закрытие попапа с добавлением карточки
// profileButton.addEventListener('click', () => openPopupPlaces());
// closePlacesButton.addEventListener('click', () => closePopup(popupPlaces));

// const submitEditProfileForm = evt => {
//     evt.preventDefault();
//     profileTitle.textContent = nameInput.value;
//     profileSubtitle.textContent = jobInput.value;
//     closePopup(popupProfile);
// }
// formElementProfile.addEventListener('submit', submitEditProfileForm);

profileButton.addEventListener('click',  openPopupPlaces);

function openPopupPlaces () {
  const popup = new PopupWithForm({
    handleSubmitForm: (item) => {
    // Создадим экземпляр карточки
    const cardElm = new Card({
      data: item,
      handleCardClick: () => handleCardClick(item)
    },  '.cards__item');
    // Создаём карточку и возвращаем наружу
    const cardElement = cardElm.generateCard();
    // добавляем карточку в DOM
    cardList.addItem(cardElement);
    popup.close();
    }
  }, '.popup-places');
 
  addPostFormValidate.enableValidation();
  popup.open();
}