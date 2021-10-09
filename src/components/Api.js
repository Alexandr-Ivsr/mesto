class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getProfileData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  getCardsData() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  updateProfileData({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  createCardData({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  deleteCardData(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => {
      return this._getResponseData(res);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then((res) => {
      return this._getResponseData(res);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  dislikeCard(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => {
      return this._getResponseData(res);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  updateProfileAvatar({avatar}) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    })
    .catch((error) => {
      console.log(error);
    })
  }
};

export default Api;
