export default class UserInfo {
  constructor( profileTitle, profileSubtitle ) {
    this._userNameElement = document.querySelector(profileTitle);
    this._userAboutMeElement = document.querySelector(profileSubtitle);
  }
// собрать данные пользлвателя
  getUserInfo() {
    this._userInfo = {};
    this._userInfo.user= this._userNameElement.textContent;
    this._userInfo.about = this._userAboutMeElement.textContent;
    console.log(this._userInfo);

    return this._userInfo;
  }
// добавить данные пользователя на стр
  setUserInfo(data) {
    this._userNameElement.textContent = data.user;
    this._userAboutMeElement.textContent = data.about;
  }
}