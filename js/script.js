const profileInfoButton = document.querySelector('.profile__info-button');
const profileButton = document.querySelector('.profile__button');
const profileTitle = document.querySelector('.profile__info-title');
const profileSubtitle = document.querySelector('.profile__info-subtitle');
const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const closeButton = popup.querySelector('.popup__close');
const formElement = document.querySelector('.form');
const nameInput = document.querySelector('#input-name');
const jobInput = document.querySelector('#input-job');
const cards = document.querySelector('.cards');
const popupPlaces = document.querySelector('.popup-places');
const closePlacesButton = popupPlaces.querySelector('.popup__close');
const popupNewPlaces = popupPlaces.querySelector('.popup__new-places');
const popupProfile = document.querySelector('.popup-profile');

// Открытие попапов
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
  popup.addEventListener('click', closePopupOnOverlay);
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

// Открытие и закрытие попапа с добавлением карточки
profileButton.addEventListener('click', () => openPopup(popupPlaces));
closePlacesButton.addEventListener('click', () => closePopup(popupPlaces));


// функция добавления/удаления лайка
function likeActive (evt) {
  evt.target.classList.toggle('cards__link-active');
}

// редактирование профиля
const formSubmitHandler = evt => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupProfile);
}
formElement.addEventListener('submit', formSubmitHandler);

// создание карточки 
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Снег в горах'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Озеро в горах'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Многоэтажки'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Тундра'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Железная дорога'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Зимний байкал'
  }
];
const initialTemplate = document.querySelector('.template-cards');
function createCard(elm) {
  const card= initialTemplate.content.firstElementChild.cloneNode(true);
  const cardImage = card.querySelector('.cards__image');

  cardImage.src = elm.link;
  cardImage.alt = elm.name;
  card.querySelector('.cards__title').textContent = elm.name;
  card.querySelector('.cards__link').addEventListener('click', likeActive);
  card.querySelector('.cards__close').addEventListener('click', removeCard);
  cardImage.addEventListener('click', openPopupImages);
  
  return card;
}
// добавление карточки на страницу
function renderPlace(elm) {
  cards.prepend(createCard(elm));
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
  document.querySelector('#form-add').reset();
}
cardsForm.addEventListener('submit', submitAddCardForm);

// открытие / закрытие картинки
  const popupImages = document.querySelector('.popup-images');
  const imagesButtonClose = popupImages.querySelector('.popup__close');
  const popupImagesTitle = popupImages.querySelector('.popup-images__title');
  const popupImagesImg = popupImages.querySelector('.popup-images__img');

  function openPopupImages(evt){
    openPopup(popupImages);
    popupImagesImg.src = evt.target.src;
    popupImagesImg.alt = evt.target.alt;
    popupImagesTitle.textContent = evt.target.alt;
  }
  imagesButtonClose.addEventListener('click', function(){
    closePopup(popupImages);
  });

// удаляем карточку со страницы
function removeCard(e) {
  e.target.closest('.cards__item').remove();
}