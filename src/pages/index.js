import './index.css'; 
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

const editProfilePopup = new PopupWithForm({
    handleSubmitForm: (item) => {
      userInfo.setUserInfo(item);
      editProfilePopup.close();
    }
  }, '.popup-profile');
editProfileFormValidate.enableValidation(); //валидация

profileInfoButton.addEventListener('click', openPopupProfile);
function openPopupProfile() {
  editProfilePopup.open();
  editProfilePopup.setInputValues(userInfo.getUserInfo());
  editProfileFormValidate.toggleButtonState();
}

// открытие попапа добавление карточки
const addCardPopup = new PopupWithForm({
  handleSubmitForm: (item) => {
    const postCard = createCard(item);
    // console.log(postCard);
    cardList.addItem(postCard);
    addCardPopup.close();
  }
}, '.popup-places');
addPostFormValidate.enableValidation(); //валидация

profileButton.addEventListener('click',  openPopupPlaces);

function openPopupPlaces () {
  addCardPopup.open();
  addPostFormValidate.toggleButtonState();
}

// обработчик клика по карточке
const imagePopup = new PopupWithImage('.popup-images');
function handleCardClick(data) {
  imagePopup.open(data);
}

// создаем карточку 
function createCard(item) { 
  const cardElm = new Card({
    data: item,
    handleCardClick: () => handleCardClick(item)
  }, '.template-cards');
  const placeElement = cardElm.generateCard(); 
  return placeElement; 
}  

// вызов генерации карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const postCard = createCard(item);
    cardList.addItem(postCard);
  }
}, '.cards');
// вызов отрисовки всех карточек на странице 
cardList.rendererItems();
