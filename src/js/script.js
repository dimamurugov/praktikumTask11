import "../pages/index.css";

import dataNameError from './dataNameError';
import initialCards from './initialCards';
import CardList from './cardList';
import Card from './card';
import Popup from './popup';
import UserInfo from './userInfo';
import FormValidator from './formValidator';
import ImagePopup from './imagePopup';
import FormPopup from './formPopup';
import Api from './api';


//КОНСТАНТЫ
const placesList = document.querySelector('.places-list');
const popupImage = document.querySelector('.popup_theme_image');
const nameProfile = document.querySelector('.user-info__name');
const descriptionProfile = document.querySelector('.user-info__job');
const FormAdd = document.querySelector('.popup__form_add');
const FormEdit = document.querySelector('.popup__form_edit');
const FormAvatar = document.querySelector('.popup__form_avatar');
const popupAdd = document.querySelector('.popup_theme_add-card');
const popupEdit = document.querySelector('.popup_theme_edit-popup');
const popupAvatar = document.querySelector('.popup_theme_avatar');
const buttonAdd = document.querySelector('.user-info__button');
const buttonEdit = document.querySelector('.user-info__edit-button');
const buttonAvatar = document.querySelector('.user-info__photo');


const API_URL = process.env.NODE_ENV === "production" ? "https://nomoreparties.co" : "http://nomoreparties.co";


function _createCard(data) {
    const newCard = new Card(data, openImage, api, _getMyID, _getUserProfile);
    return newCard.create(data)
}
//КолБэк функции
function openImage(link) {
    imagePopup.render(link);
}
function _updateEditProfile(name, descriprion, avatar) {
    userInfo.setUserInfo(name, descriprion, avatar);
    userInfo.updateUserInfo();
}
function _getUserProfile() {
    return userInfo.getUserInfo();
}
function _setSubmitButtonState() {
    validatorEditForm.setSubmitButtonState(this.form.button, true);
}
function _setSubmitButtonStateAddForm() {
    validatorAddForm.setSubmitButtonState(this.form.button, false);
}
function _setSubmitButtonStateAvatar() {
    validatorAvatarForm.setSubmitButtonState(this.form.button, false);
}
function _clearErrorMassegeAddCard() {
    validatorAddForm._clearErrorMassege();
}
function _clearErrorMassegeEditProfile() {
    validatorEditForm._clearErrorMassege();
}
function _clearErrorMassegeAvatar() {
    validatorAvatarForm._clearErrorMassege();
}
function _getMyID() {
    return userInfo._getMyId()
}
const api = new Api({

    baseUrl: `${API_URL}/cohort11`,
    headers: {
      authorization: '8a9e37f1-9e18-44ec-b047-b5ce93ddaf7f',
      'Content-Type': 'application/json'
    }
});
const containerList = new CardList(placesList, _createCard, api);
containerList.render();
const userInfo = new UserInfo(nameProfile, descriptionProfile,buttonAvatar, api);
const imagePopup = new ImagePopup(popupImage);
imagePopup.setListeners();
const validatorEditForm = new FormValidator(FormEdit);
const profileFormInst = new FormPopup(popupEdit, FormEdit, buttonEdit, _setSubmitButtonState, _clearErrorMassegeEditProfile, openProfileFormInst, submitProfileFormInst);
const validatorAddForm = new FormValidator(FormAdd);
const cardFormInst = new FormPopup(popupAdd, FormAdd, buttonAdd, _setSubmitButtonStateAddForm, _clearErrorMassegeAddCard, openCardFormInst, submitCardFormInst);
const validatorAvatarForm = new FormValidator(FormAvatar);
const avatarFormInst = new FormPopup(popupAvatar, FormAvatar, buttonAvatar, _setSubmitButtonStateAvatar, _clearErrorMassegeAvatar,openAvatarFormInst,submitAvatarFormInst);
function openAvatarFormInst () {
    this.doOnOpenForm();
    this.setListeners();
    this.open();
}
function submitAvatarFormInst(event) {
    event.preventDefault();
    this.form.elements.button.textContent = 'Загрузка...';
    api.patchUploadAvatar(this.form.elements.linkField.value)
    .then((data) => {
        _updateEditProfile(data.name, data.about, data.avatar);
        this.close();
        this.form.elements.button.textContent = 'Сохранить';
    }).catch((err) => {
        console.log(err);
        this.form.elements.button.textContent = 'Сохранить';
    });
}
function openProfileFormInst () {
    const tempData = _getUserProfile();
    this.form.elements.nameField.value = tempData.name;
    this.form.elements.description.value = tempData.description;
    this.doOnOpenForm();
    this.setListeners();
    this.open();
}
function submitProfileFormInst(event) {
    event.preventDefault();
    this.form.elements.button.textContent = 'Загрузка...';
    
    api.patchEditChangesProfile(this.form.elements.nameField.value, this.form.elements.description.value)
    .then((data) => {
        _updateEditProfile(data.name, data.about, data.avatar);
        this.close();
        this.form.elements.button.textContent = 'Сохранить';
    }).catch((err) => {
        console.log(err);
        this.form.elements.button.textContent = 'Сохранить';
    });
}
function openCardFormInst () {
    this.doOnOpenForm();
    this.setListeners();
    this.open()
}
function submitCardFormInst (event) {
    event.preventDefault();
    this.form.elements.button.textContent = 'Загрузка...';
    api.postServerCard(this.form.elements.name.value, this.form.elements.link.value)
    .then((data) => {
        const temp = _createCard(data);
        containerList.addCard(temp);// А это замыкание, если так делать нельзя(получается сильная связность) наругайте меня

        this.close();
        this.form.elements.button.textContent = '+';
    }).catch((err) => {
        console.log(err);
        this.form.elements.button.textContent = '+';
    });
}
profileFormInst.setListenersForm();
cardFormInst.setListenersForm();
avatarFormInst.setListenersForm();
