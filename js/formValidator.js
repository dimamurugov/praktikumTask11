class FormValidator {
    constructor(form) {
        this.form = form;
        this.inputs = [...form.querySelectorAll('input')];
        this.setEventListeners();
    }
    //Метод показывает ошибку, если инпуты не проходят валидацию
    checkInputValidity(input, errorMessage) {
        const valid = this._isValidate(input);
        errorMessage.textContent = input.validationMessage;
    }
    
    //чтобы делать кнопку сабмита активной и неактивной
    setSubmitButtonState(button, state) {
        if (state) {
            button.removeAttribute('disabled');
            button.classList.add(`popup__button_state_actively`);
        } else {
            button.setAttribute('disabled', true);
            button.classList.remove(`popup__button_state_actively`);
        }
    }
    //Добавлять обработчики
    setEventListeners(){
        this.inputs.forEach(input => {
            
            input.addEventListener('input', (event) => {
              const errorMessage = input.parentNode.querySelector(`#error-${input.id}`);
              this.checkInputValidity(input, errorMessage);  
              this.setSubmitButtonState(this.form.button, this.inputs.every(this._isValidate));
            });
        })
    }

    _clearErrorMassege() {
        this.inputs.forEach(input => {
            const errorMessage = input.parentNode.querySelector(`#error-${input.id}`);
            errorMessage.textContent = "";
        });
    }

    _isValidate(input) {
        input.setCustomValidity(""); 

        //Проверка наличия символов
        if (input.validity.valueMissing) {
          input.setCustomValidity(errorMessages.empty);
          return false
        }  
        //Проверка минимального кол-ва символов
        if (input.validity.tooShort || input.validity.tooLong) {
          input.setCustomValidity(errorMessages.wrongLength);
          return false
        } 
        //Проверка введенна ли ссылка
        if (input.validity.typeMismatch && input.type === 'url') {
          input.setCustomValidity(errorMessages.wrongUrl);
          return false
        } 
        //проверка на максимальное кол-во символов
        if (input.validity.rangeOverflow) {
          let max = input.getAttribute('max');
          input.setCustomValidity(errorMessages.wrongMaxLength);
          return false
        }
        return input.checkValidity();
    }
}