import { sendData } from './api';
import{
  rendeMessageModal,
  buttonCloseHendler,
} from './upload-modal';

const VALIDATE_MESSAGE = {
  MAX_HASHTAGS: 'Нельзя указать больше пяти хэштегов',
  MAX_LENGTH: 'максимальная длина одного хэштега 20 символов, включая решётку',
  SPACE_MISSING: '# Разделяються пробелами',
  ERROR_FORMAT: 'Должен начинаться с # и содержать больше одного символа',
  REPEAT_HASHTAG: 'Один и тот же хэштег не может быть использован дважды',
  COMMENT_MAX_LENGTH: 'длина комментария больше 140 символов',
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
let errorKey = null;


const returnErrorText = () => errorKey;

const validateHashtags = (input) => {
  const trimedInput = input.trim().toLowerCase();
  const hashtags = trimedInput.split(/\s+/);
  const uniqueHashtags = new Set();
  if(hashtags.length > 5) {
    errorKey = VALIDATE_MESSAGE.MAX_HASHTAGS;
    return false;
  }
  for(const hashtag of hashtags) {
    if(hashtag.length > 20) {
      errorKey = VALIDATE_MESSAGE.MAX_LENGTH;
      return false;
    }

    if(hashtag.split('#').length > 2) {
      errorKey = VALIDATE_MESSAGE.SPACE_MISSING;
      return false;
    }

    if(!patternHashtags.test(hashtag) && hashtag !== '') {
      errorKey = VALIDATE_MESSAGE.ERROR_FORMAT;
      return false;
    }

    if(uniqueHashtags.has(hashtag)) {
      errorKey = VALIDATE_MESSAGE.REPEAT_HASHTAG;
      return false;
    }
    uniqueHashtags.add(hashtag);
  }
  return true;
};


const validateSringLength = (value) => {
  if(value.length > 140) {
    errorKey = VALIDATE_MESSAGE.COMMENT_MAX_LENGTH;
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


pristine.addValidator(inputHashtags, validateHashtags, returnErrorText);
pristine.addValidator(inputDescription, validateSringLength, returnErrorText);

const renderInfoModalSuccess = () => {
  const sendTemplateSuccess = document.querySelector('#success').content;
  const addedModalHendler = rendeMessageModal(sendTemplateSuccess);
  addedModalHendler();
};
const renderInfoModalError = () => {
  const sendTemplateError = document.querySelector('#error').content;
  const addedModalHendler = rendeMessageModal(sendTemplateError);
  addedModalHendler();
};

const blockSubmitButton = () => {
  uploadButton.disabled = true;
  uploadButton.textContent = SUBMIT_BUTTON_TEXT.SENDING;
};

const unblockSubmitButton = () => {
  uploadButton.disabled = false;
  uploadButton.textContent = SUBMIT_BUTTON_TEXT.IDLE;
};

const userFormSubmitHendler = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid) {
    blockSubmitButton();
    sendData(new FormData (evt.target))
      .then(() => {
        renderInfoModalSuccess();
        buttonCloseHendler();
      })
      .catch(() => {
        renderInfoModalError();
      })
      .finally(unblockSubmitButton);
  }
};


function resetPrestine () {
  pristine.reset();
}

export{
  userFormSubmitHendler,
  resetPrestine,
};
