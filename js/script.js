let profileInfoButton = document.querySelector('.profile__info-button');
let profileTitle = document.querySelector('.profile__info-title');
let profileSubtitle = document.querySelector('.profile__info-subtitle');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('#input-name');
let jobInput = document.querySelector('#input-job');


let popupOpen = () => {
  popup.classList.add('popup_opened');
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
}
let popupClose = () => {
  popup.classList.remove('popup_opened');
}

let formSubmitHandler = evt => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', popupClose);
profileInfoButton.addEventListener('click', popupOpen);