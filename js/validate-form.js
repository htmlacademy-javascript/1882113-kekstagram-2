import { sendData } from './api';
import{
  renderInfoModal,
} from './upload-modal';

const VALIDATE_MESSAGE = {
  'exceeded quantity': 'Нельзя указать больше пяти хэштегов',
  'max length': 'максимальная длина одного хэштега 20 символов, включая решётку',
  'space missing': '# Разделяються пробелами',
  'error format': 'Должен начинаться с # и содержать больше одного символа',
  'repeat hashtag': 'Один и тот же хэштег не может быть использован дважды',
  'comment max length': 'длина комментария больше 140 символов',
};

const SUBMIT_BUTTON_TEXT = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};

const uploadForm = document.querySelector('.img-upload__form');
const uploadButton = document.querySelector('#upload-submit');
const inputHashtags = uploadForm.querySelector('.text__hashtags');
const inputDescription = uploadForm.querySelector('.text__description');
const patternHashtags = /^#[a-zа-яё0-9]{1,19}$/i;
let errorKey;


const errorText = () => VALIDATE_MESSAGE[errorKey];

const validateHashtags = (input) => {
  const trimedInput = input.trim().toLowerCase();
  const hashtags = trimedInput.split(/\s+/);
  const uniqueHashtags = new Set();
  if(hashtags.length > 5) {
    errorKey = 'exceeded quantity';
    return false;
  }
  for(const hashtag of hashtags) {
    if(hashtag.length > 20) {
      errorKey = 'max length';
      return false;
    }

    if(hashtag.split('#').length > 2) {
      errorKey = 'space missing';
      return false;
    }

    if(!patternHashtags.test(hashtag) && hashtag !== '') {
      errorKey = 'error format';
      return false;
    }

    if(uniqueHashtags.has(hashtag)) {
      errorKey = 'repeat hashtag';
      return false;
    }
    uniqueHashtags.add(hashtag);
  }
  return true;
};


const validateSringLength = (value) => {
  if(value.length > 140) {
    errorKey = 'comment max length';
    return false;
  }
  return true;
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
}, true);


pristine.addValidator(inputHashtags, validateHashtags, errorText);
pristine.addValidator(inputDescription, validateSringLength, errorText);

const renderInfoModalSuccess = () => {
  const sendTemplateSuccess = document.querySelector('#success').content;
  renderInfoModal(sendTemplateSuccess);
};
const renderInfoModalError = () => {
  const sendTemplateError = document.querySelector('#error').content;
  renderInfoModal(sendTemplateError);
};

const blockSubmitButton = () => {
  uploadButton.disabled = true;
  uploadButton.textContent = SUBMIT_BUTTON_TEXT.SENDING;
};

const unblockSubmitButton = () => {
  uploadButton.disabled = false;
  uploadButton.textContent = SUBMIT_BUTTON_TEXT.IDLE;
};


uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid) {
    console.log('Форма отправлена');
    blockSubmitButton();
    sendData(new FormData (evt.target), renderInfoModalSuccess, renderInfoModalError)
      .finally(unblockSubmitButton);
  } else {
    console.log('Форма не отправлена');
  }
});

function resetPrestine () {
  pristine.reset();
}

export{resetPrestine};
