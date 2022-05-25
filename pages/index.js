import { Card } from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section  from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { configValid,
  initialCards,
  profileInfoButton,
  profileButton,
  popupProfile,
  popupNewPlaces,
  userNameSelector,
  userAboutSelector} from "../utils/constant.js";

const editProfileFormValidate = new FormValidator(configValid, popupProfile);
const addPostFormValidate = new FormValidator(configValid, popupNewPlaces);
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

// открытие попапа добавление карточки
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