export default class UserInfo {
  constructor( profileTitle, profileSubtitle, profileavatar ) {
    this._userNameElement = document.querySelector(profileTitle);
    this._userAboutMeElement = document.querySelector(profileSubtitle);
    this._userAvatarElement =document.querySelector(profileavatar);
  }
// собрать данные пользлвателя
  getUserInfo() {
    // this._userInfo = {};
    // this._userInfo.user= this._userNameElement.textContent;
    // this._userInfo.about = this._userAboutMeElement.textContent;
    
    // return this._userInfo;
    return{
      name: this._userNameElement.textContent,
      about: this._userAboutMeElement.textContent
    }
  }
// добавить данные пользователя на стр
  setUserInfo({ name, about }) {
    this._userNameElement.textContent = name;
    this._userAboutMeElement.textContent = about;
  }

  setUserInfoAvatar({ avatar }){
    this._userAvatarElement.src= avatar;
  }
}