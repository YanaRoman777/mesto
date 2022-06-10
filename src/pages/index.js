import './index.css'; 
import { Card } from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section  from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import { configValid,
  profileInfoButton,
  profileButton,
  popupProfile,
  popupNewPlaces,
  popupAvatar,
  avatar,
  avatarImage,
  buttonEditSave,
  buttonAddSave,
  buttonAvatarSave,
  buttonDelSave,
  userNameSelector,
  userAboutSelector} from "../utils/constant.js";

const editProfileFormValidate = new FormValidator(configValid, popupProfile);
const editAvatarFormValidate = new FormValidator(configValid, popupAvatar);
editAvatarFormValidate.enableValidation();
const addPostFormValidate = new FormValidator(configValid, popupNewPlaces);
const userInfo = new UserInfo( userNameSelector, userAboutSelector, avatarImage );

const api = new Api('https://nomoreparties.co/v1/cohort-41', '53851028-e5d8-4641-b003-498552004b40');
let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;

    cardList.renderItems(cards);
    userInfo.setUserInfo(userData);
    userInfo.setUserInfoAvatar(userData);

    return userId;
  })
  .catch((err) => {
    console.log(err);

    return [];
  });

// открытие окна редакции профиля
const editProfilePopup = new PopupWithForm({
  handleSubmitForm: (item) => {
    buttonEditSave.textContent='Сохранение...';
    
    const userWithServer = api.editProfile(item);
    userWithServer
      .then(({name, about}) => {
        userInfo.setUserInfo({name, about});
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(err);
        return [];
      }) 
      .finally(() => {
        buttonEditSave.textContent='Сохранить';
      });
  }
}, '.popup-profile');

// const editProfilePopup = new PopupWithForm({
//     handleSubmitForm: (item) => {
//       userInfo.setUserInfo(item);
//       editProfilePopup.close();
//     }
//   }, '.popup-profile');
editProfileFormValidate.enableValidation(); //валидация

profileInfoButton.addEventListener('click', openPopupProfile);
function openPopupProfile() {
  editProfilePopup.open();
  editProfilePopup.setInputValues(userInfo.getUserInfo());
  editProfileFormValidate.toggleButtonState();
}

// вызов генерации карточек
const cardList = new Section({
  // items: initialCards,
  renderer: (item) => {
    const postCard = createCard(item);
    cardList.addItem(postCard);
  }
}, '.cards');
// вызов отрисовки всех карточек на странице 
// cardList.renderItems();


// создаем карточку 
// function createCard(item) { 
//   const cardElm = new Card({
//     data: item,
//     handleCardClick: () => handleCardClick(item)
//   }, '.template-cards');
//   const placeElement = cardElm.generateCard(); 
//   return placeElement; 
// }  

function createCard(item){
  const cardElm = new Card(
    item,
    userId,
    {
    handleCardClick: () => handleCardClick(item),
    
    handleDelCard: (postElement, cardId, deleteCard) => {
      popupWithConfirmation.open(postElement, cardId, deleteCard);
    },
    handleLikeClick: (likeButton, cardId,card) =>{
      if(cardElm.isLiked()){
        api
          .deleteLike(cardId)
          .then((res)=>{
            cardElm.updateLikes(card, res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      else {
        api
          .addLike(cardId)
          .then((res) => {
            cardElm.updateLikes(card, res.likes);
          })
          .catch((err) => {
            console.log(err);

            return [];
          });
      }
    }
  }, '.template-cards');
  const placeElement = cardElm.generateCard();
  return placeElement;
}


// // открытие попапа добавление карточки
// const addCardPopup = new PopupWithForm({
//   handleSubmitForm: (item) => {
//     const postCard = createCard(item);
//     // console.log(postCard);
//     cardList.addItem(postCard);
//     addCardPopup.close();
//   }
// }, '.popup-places');

const addCardPopup = new PopupWithForm({
  handleSubmitForm: (item) => {
    //console.log(buttonAddSave);
    buttonAddSave.textContent = 'Сохранение...';
    const place1 = api.addPlace(item);
    place1
      .then((data) => {
        const postCard = createCard(data);
        cardList.addItem(postCard);
        addCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
        return [];
      })
      .finally(() => {
        buttonAddSave.textContent='Создать';
      });
  }

}, '.popup-places');
addPostFormValidate.enableValidation(); //валидация


profileButton.addEventListener('click',  openPopupPlaces);
// открытие попапа добавление карточки
function openPopupPlaces () {
  addCardPopup.open();
  addPostFormValidate.toggleButtonState();
}

// обработчик клика по карточке
const imagePopup = new PopupWithImage('.popup-images');
function handleCardClick(data) {
  imagePopup.open(data);
}

const popupWithConfirmation = new PopupWithConfirmation(handleDelCardPopup,'.popup-delete')
function handleDelCardPopup(post, cardId){
  //console.log(cardId+' cardId');
  buttonDelSave.textContent='Удаление...';
  api.deletePost(cardId).then(()=>{
      //console.log('udalyaem');
    
      post.remove();
    })
    .catch((err) => {
      console.log(err);

      return [];
    })
    .then(() => {
      popupWithConfirmation.close();
    })
    .finally(() => {
      buttonDelSave.textContent='Да';
    });
}

const popupNewAvatar = new PopupWithForm({
  handleSubmitForm: ({avatar}) =>{
    buttonAvatarSave.textContent='Сохранение...';
    api
      .addAvatar({ avatar })
      .then((res) => {
        userInfo.setUserInfoAvatar(res);
      })
      .catch((err) => {
        console.log(err);
  
        return [];
      })
      .then(() => {
        popupNewAvatar.close();
      })
      .finally(() => {
        buttonAvatarSave.textContent='Сохранить';
      });
  }
  
}, '.popup-avatar');

function addAvatar(){
  popupNewAvatar.open();
  editAvatarFormValidate.toggleButtonState();
}

document.querySelector(avatar).addEventListener('click', addAvatar);