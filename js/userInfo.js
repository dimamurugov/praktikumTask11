class UserInfo {
    constructor(name, description, avatar, api) {

        this.name = name;
        this.description = description;
        this.avatar = avatar;
        this.api = api;

        /*
         Можно лучше:
         - удалить неиспользуемыую переменную
         + Удалил
        */

        this.nameProfile = this.name.textContent;
        this.descriptionProfile = this.description.textContent;
        this.avatarProfile = this.avatar.src;

        this.downloadUserInfo();
    }
    
    _getMyId() {
        return this.myId
    }

    setUserInfo(name, description, avatarLink) {
        
        /*
         Надо исправить:
         - Дополнить метод ссылкой на аватар
         + Дополнил
        */

        this.nameProfile = name;
        this.descriptionProfile = description;
        this.avatarProfile = avatarLink;
       
    }

    //обновление данный только на клиенте!!
    updateUserInfo() {
        this.name.textContent = this.nameProfile;
        this.description.textContent = this.descriptionProfile;
        this.avatar.src = this.avatarProfile;
    }

    //метод для получение данных с страницы для формы
    getUserInfo() {
        return {name: this.nameProfile, description: this.descriptionProfile}
    }

    downloadUserInfo() {
        this.api.getAboutMe()
        .then((data) => {

            this.myId = data._id;
            
            this.setUserInfo(data.name, data.about, data.avatar);

            /*
             Надо исправить:
             - Для исправления внутренних свойств есть метод setUserInfo
             + Использовал метод setUserInfo
            */

            this.updateUserInfo()
        }).catch((err) => {
            console.log(err);
        });
    }
}
