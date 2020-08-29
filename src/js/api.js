export default class Api {
    constructor(options) {
        this.options = options;
    }
  
    _checkResponseValidity(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }  
    
    
    getAboutMe() {
        return fetch(`${this.options.baseUrl}/users/me`, {
            headers: {
                authorization: this.options.headers.authorization
              }
        }).then(res => {
            return this._checkResponseValidity(res)
        });
    }
    getMassCards() {
        return fetch(`${this.options.baseUrl}/cards`,{
            headers: {
                authorization: this.options.headers.authorization
            }
        }).then(res => {
            return this._checkResponseValidity(res)
        });
    }
    
    patchEditChangesProfile(name, about) {
        return fetch(`${this.options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
              authorization: this.options.headers.authorization,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              about: about
            })
        }).then(res => {
            return this._checkResponseValidity(res)
        });
    }
    postServerCard(name, link) {
        return fetch(`${this.options.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(res => {
            return this._checkResponseValidity(res)
        });
    }
    deleteCard(idCard) {
        return fetch(`${this.options.baseUrl}/cards/${idCard}`, {
            method: 'DELETE',
            headers: {
                authorization: this.options.headers.authorization
            }
        }).then((res) => {
            return this._checkResponseValidity(res)
        });
    }
    putLikeCard(idCard) {
        return fetch(`${this.options.baseUrl}/cards/like/${idCard}`,{
            method: 'PUT',
            headers: {
                authorization: this.options.headers.authorization
            }
        }).then(res => {
            return this._checkResponseValidity(res)
        });
    }
    deleteLikeCard(idCard) {
        return fetch(`${this.options.baseUrl}/cards/like/${idCard}`, {
            method: 'DELETE',
            headers: {
                authorization: this.options.headers.authorization
            }
        }).then(res => {
            return this._checkResponseValidity(res)
        });
    }
    
    patchUploadAvatar(link) {
        return fetch(`${this.options.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: link
            })
        }).then(res => {
            return this._checkResponseValidity(res)
        });
    }
}
  