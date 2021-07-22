class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
  }

  getUserInfo = () => {
    return {
      userName: this._userNameSelector.textContent,
      userInfo: this._userInfoSelector.textContent,
    }
  }

  setUserInfo = (data) => {
    this._userNameSelector.textContent = data.name;
    this._userInfoSelector.textContent = data.job;
  }
}

export default UserInfo;
