import Popup from './popup';

export default class ImagePopup extends Popup {
    constructor(popup) {
        super(popup);
    }

    render(link) {
        const image = this.popup.querySelector('.popup__image');
        image.setAttribute('src', link);
        this.open();
    }
}
