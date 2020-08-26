class FormPopup extends Popup {
    constructor(popup, form, openButton, setSubmitButtonState, clearErrorMassege, funOpenForm, funSubmitForm) {
        super(popup);
        this.form = form;
        this.openButton = openButton;

        this.setSubmitButtonState = setSubmitButtonState;
        this.clearErrorMassege = clearErrorMassege;
        this.funOpenForm = funOpenForm;
        this.funSubmitForm = funSubmitForm;

        this.openForm = this.openForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    openForm() {
        this.funOpenForm();
    };

    submitForm(event) {
        this.funSubmitForm(event);
    };

    close() {
        this.form.reset();
        super.close();
    }

    doOnOpenForm() {
        this.clearErrorMassege();
        this.setSubmitButtonState();
    }

    setListenersForm() {
        this.openButton.addEventListener("click", this.openForm);
        this.form.addEventListener("submit", this.submitForm);
    }
}


/*
 Надо исправить:
 - openForm и submitForm передавать в конструкторе, а не переназначать методы внутри script.js
 + вместо переиспользования функций в script.js создал соответстувующие колбэк функии и передаю в конструктор formPopup где они вызываются в метода openForm и submitForm соответственно
*/
