class Api {
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
        return fetch('https://praktikum.tk/cohort11/users/me', {
            headers: {
                authorization: this.options.headers.authorization
              }
        }).then(res => {
            return this._checkResponseValidity(res)
        });
    }
    getMassCards() {
        return fetch('https://praktikum.tk/cohort11/cards',{
            headers: {
                authorization: this.options.headers.authorization
            }
        }).then(res => {
            return this._checkResponseValidity(res)
        });
    }
    
    patchEditChangesProfile(name, about) {
        return fetch('https://praktikum.tk/cohort11/users/me', {
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
        return fetch('https://praktikum.tk/cohort11/cards', {
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
        return fetch(`https://praktikum.tk/cohort11/cards/${idCard}`, {
            method: 'DELETE',
            headers: {
                authorization: this.options.headers.authorization
            }
        }).then((res) => {
            return this._checkResponseValidity(res)
        });
    }
    putLikeCard(idCard) {
        return fetch(`https://praktikum.tk/cohort11/cards/like/${idCard}`,{
            method: 'PUT',
            headers: {
                authorization: this.options.headers.authorization
            }
        }).then(res => {
            return this._checkResponseValidity(res)
        });
    }
    deleteLikeCard(idCard) {
        return fetch(`https://praktikum.tk/cohort11/cards/like/${idCard}`, {
            method: 'DELETE',
            headers: {
                authorization: this.options.headers.authorization
            }
        }).then(res => {
            return this._checkResponseValidity(res)
        });
    }
    
    patchUploadAvatar(link) {
        return fetch(`https://praktikum.tk/cohort11/users/me/avatar`, {
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
  