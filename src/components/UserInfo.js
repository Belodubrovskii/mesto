export default class UserInfo {
  constructor (nameSelector, activitySelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._activity = document.querySelector(activitySelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo () {
    this._userData = {};
    this._userData.name = this._name.textContent;
    this._userData.activity = this._activity.textContent;
    return this._userData;
  }

  setUserInfo (name, activity) {
    this._name.textContent = name;
    this._activity.textContent = activity;
  }

  setUserAvatar (avatar) {
    this._avatar.style.backgroundImage = `url('${avatar}')`;
  }
}
