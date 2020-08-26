class CardList {
    constructor(container, createCard, api) {
        this.container = container;
        this._createCard = createCard;
        this.api = api;
    }

    addCard(element) {
        this.container.appendChild(element);
    }

    render() {
        this.api.getMassCards()
        .then(data => {
            data.forEach(element => {
                this.addCard(this._createCard(element))
            });
        }).catch((err) => {
            console.log(err);
        });
    }
}