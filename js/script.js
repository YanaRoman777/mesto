const profileInfoButton = document.querySelector('.profile__info-button');
const profileButton = document.querySelector('.profile__button');
let profileTitle = document.querySelector('.profile__info-title');
let profileSubtitle = document.querySelector('.profile__info-subtitle');
const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const closeButton = popup.querySelector('.popup__close');
const formElement = document.querySelector('.form');
let nameInput = document.querySelector('#input-name');
let jobInput = document.querySelector('#input-job');
const cards = document.querySelector('.cards');
const initialTemplate = document.querySelector('.template-cards').content;
const popupPlaces = document.querySelector('.popup-places');
const closePlacesButton = popupPlaces.querySelector('.popup__close');
const popupNewPlaces = popupPlaces.querySelector('.popup__new-places');
const popupImages = document.querySelector('.popup-images');
const closeImagesButton = popupImages.querySelector('.popup__close');
const cardsForm = popupNewPlaces.querySelector('.form');
const titleInput = cardsForm.querySelector('[name=title]');
const linkInput = cardsForm.querySelector('[name=link]');


//открытие попапов
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function openPopupPlaces () {
  popupPlaces.classList.add('popup_opened');
}

function openPopupImages () {
  popupImages.classList.add('popup_opened');
}


// закрытие попапов

function closePopup () {
  popup.classList.remove('popup_opened');
}

function closePopupPlaces () {
  popupPlaces.classList.remove('popup_opened');
}

function closePopupImages () {
  popupImages.classList.remove('popup_opened');
}



// функция добавления/удаления лайка
const cardsLink = cards.querySelector('.cards__link');

function likeActive () {
  cardsLink.classList.add('cards__link-active');
}

// удаляем карточку со страницы
function removeCard(e) {
  e.target.closest('.cards__item').remove();
}

// редактирование профиля
let formSubmitHandler = evt => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', closePopup);
closePlacesButton.addEventListener('click', closePopupPlaces)
closeImagesButton.addEventListener('click', closePopupImages)
profileInfoButton.addEventListener('click', openPopup);
profileButton.addEventListener('click', openPopupPlaces);

// загружаем карточки на страницу
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


initialCards.forEach(function (element) {
  const cardsElement = initialTemplate.cloneNode(true);

  cardsElement.querySelector('.cards__title').textContent = element.name;
  cardsElement.querySelector('.cards__image').src = element.link;
  cardsElement.querySelector('.cards__image').alt = element.alt;
  cardsElement.querySelector('.cards__close').addEventListener('click', removeCard);
  const cardsLink = cardsElement.querySelector('.cards__link');
  cardsElement.querySelector('.cards__image').addEventListener('click', openPopupImages);
  let popupImagesTitle = popupImages.querySelector('.popup-images__title');
  popupImagesTitle.textContent = element.name;
  let popupImagesImg = popupImages.querySelector('.popup-images__img');
  popupImagesImg.src = element.link;
  
  cardsLink.addEventListener('click', function () {
    cardsLink.classList.toggle('cards__link-active');
  }
  );
  cards.append(cardsElement)
})

// добавляем новую карточку на страницу

cardsForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newCard = initialTemplate.cloneNode(true);
  newCard.querySelector('.cards__title').innerText = titleInput.value;
  newCard.querySelector('.cards__image').src = linkInput.value;
  newCard.querySelector('.cards__close').addEventListener('click', removeCard);
  newCard.querySelector('.cards__image').addEventListener('click', openPopupImages);
  const cardsLink = newCard.querySelector('.cards__link');
  cardsLink.addEventListener('click', function () {
    cardsLink.classList.toggle('cards__link-active');
  }
  );
  cards.prepend(newCard);
  closePopupPlaces();

  titleInput.value = '';
  linkInput.value = '';
})