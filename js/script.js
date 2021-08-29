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
const formAdd = document.querySelector('#form-add');
const buttonElement = formAdd.querySelector('.form__submit');


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
  disableSubmitButton (configValid)
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


// функция добавления/удаления лайка
function likeActive (evt) {
  evt.target.classList.toggle('cards__link-active');
}

// редактирование профиля
const submitEditProfileForm = evt => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupProfile);
}
formElement.addEventListener('submit', submitEditProfileForm);

// создание карточки 
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
  resetFormAdd(formAdd);
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