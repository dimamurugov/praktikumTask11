class Card {
  constructor(data, openImage, api, _getMyID, _getUserProfile) {
        this.data = data;
        this.openImage = openImage;
        this.api = api;
        this._getUserProfile = _getUserProfile;

        this._getMyID = _getMyID;
        
        this.placeCard = null;
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
        this.showImagePopup = this.showImagePopup.bind(this);
    }

    create() {
      const template = document.createElement("div");


      template.insertAdjacentHTML('beforeend', `
      <div class="place-card">
      <div class="place-card__image" style="background-image:">
        
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name"></h3>
        <div class="place-card__container-like">
          <button class="place-card__like-icon"></button>
          <p class="place-card__like-counter">0</p>
        </div>      
        
      </div>
      </div>`);

      const imageCard = template.querySelector(".place-card__image");
      const deleteIcon = document.createElement("button");
      deleteIcon.classList.add('place-card__delete-icon');


      //Проверка моя ли карта
      if (this.data.owner._id === this._getMyID()) {
        imageCard.appendChild(deleteIcon);
      }

      
      this.placeCard = template.firstElementChild;

      this.likeIcon = this.placeCard.querySelector(".place-card__like-icon");
      this.likeCounter = this.placeCard.querySelector(".place-card__like-counter");
      this.deleteIcon = this.placeCard.querySelector(".place-card__delete-icon");
      this.image = this.placeCard.querySelector(".place-card__image");

      this.placeCard.querySelector(".place-card__name").textContent = this.data.name;
      this.image.style.backgroundImage = `url(${this.data.link})`;
      this.placeCard.querySelector(".place-card__like-counter").textContent = this.data.likes.length;

      //ставим лайк, если я уже лайкал эту картинку
      if (this.isILiked() === undefined) {
        this.likeIcon.classList.remove('place-card__like-icon_liked');
      } else {
        this.likeIcon.classList.add('place-card__like-icon_liked');
      }

      this.setListeners();
      return this.placeCard;
    }

    like() {
      
      /*
       - Надо исправить:
       - Удалить console.log()
       + Убрал
      */

      if (this.likeIcon.classList.contains('place-card__like-icon_liked')) {

        /*
         Надо исправить:
         - Поиск одного и того же DOM элемента должен выполняться один раз.
         Вынести this.placeCard.querySelector(".place-card__like-icon") в константу
         
         + вынес в this.LikeItem
        */

       this.likeIcon.classList.remove('place-card__like-icon_liked');

       this.api.deleteLikeCard(this.data._id)
        .then((data) => {
          this.placeCard.querySelector(".place-card__like-counter").textContent = data.likes.length;
        }).catch(err => console.log(err));

      } else {
        this.likeIcon.classList.add('place-card__like-icon_liked');

        this.api.putLikeCard(this.data._id)
        .then((data) => {
          this.placeCard.querySelector(".place-card__like-counter").textContent = data.likes.length;
        }).catch( err => console.log(err));
      }
    }


    remove(event) {
      const selectCard = this.placeCard.closest('.place-card');
      event.stopPropagation();
      /*
       Надо испарвить:
       - event берется не из параметров функции
       + добавил параметр event
       */
      if (window.confirm("Вы действительно хотите удалить эту картоку?")) {
        this.api.deleteCard(this.data._id)
        .then(() => {
              selectCard.remove();
              this.removeListernes();
            }
        ).catch(err => console.log(err));
      }
    }
    showImagePopup() {
      this.openImage(this.data.link);
    }
    isILiked() {

      const myName = this._getUserProfile().name;
      return this.data.likes.find((item) => {
        return item.name === myName
        /*
           Можно лучше:
           - Использвать === вместо ==
           + Добавил ===
        */
      });  
    }

    setListeners() {
      this.likeIcon.addEventListener("click", this.like);

      if (this.data.owner._id === this._getMyID()) {
        this.deleteIcon.addEventListener("click", this.remove);
      }
      this.image.addEventListener("click", this.showImagePopup);
    }

    removeListernes() {
      this.likeIcon.removeEventListener("click", this.like);

      if (this.data.owner._id === this._getMyID()) {
        this.deleteIcon.removeEventListener("click", this.remove);
      }

      this.image.removeEventListener("click", this.showImagePopup);
    }
}
