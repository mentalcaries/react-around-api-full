class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  
  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
  
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then(this._checkRes);
  }
  
  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkRes(res));
  }

  setProfileInfo(item) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: item.name,
        about: item.about,
      }),
    }).then((res) => this._checkRes(res));
  }

  addNewCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    }).then((res) => this._checkRes(res));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkRes(res));
  }

  addCardLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkRes(res));
  }

  removeCardLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkRes(res));
  }

  changeCardStatus(id, liked) {
    if (liked) {
      return this.removeCardLike(id, localStorage.getItem('jwt'));
    } else return this.addCardLike(id, localStorage.getItem('jwt'));
  }

  updateProfilePicture(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(avatar),
    }).then((res) => this._checkRes(res));
  }
}

export const api = new Api({
  baseUrl: process.env.NODE_ENV === 'production'? 'https://api.mentalcaries.students.nomoreparties.site': 'http://localhost:3000',
});

export default Api;
