let profileInfoButton = document.querySelector('.profile__info-button');
let profileTitle = document.querySelector('.profile__info-title');
let profileSubtitle = document.querySelector('.profile__info-subtitle');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-job');

let popupOpenClose = () => {
  popup.classList.toggle('popup_opened');
}

let formSubmitHandler = evt => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popupOpenClose();
    
}
let editProfile = () => {
    popupOpenClose();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  nameInput.value = '';
  jobInput.value = '';
}

formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', popupOpenClose);
profileInfoButton.addEventListener('click', editProfile);