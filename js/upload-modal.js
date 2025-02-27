import {resizeHandler} from './resize-img.js';
import {
  addedEffectHandler,
  resetSlider,
  checkHiddenSlider,
} from './slider.js';
import {
  resetPrestine,
  userFormSubmitHandler,
} from './validate-form.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const TIME_HIDDEN_ERROR = 5000;

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const buttonClose = uploadOverlay.querySelector('.img-upload__cancel');
const uploadPreview = uploadOverlay.querySelector('.img-upload__preview img');
const uploadEffectsPreview = uploadOverlay.querySelectorAll('.effects__preview');
const inputHashtags = uploadOverlay.querySelector('.text__hashtags');
const inputDescription = uploadOverlay.querySelector('.text__description');
const effectList = document.querySelector('.effects__list');
const scale = uploadOverlay.querySelector('.scale');
const sendTemplateSuccess = document.querySelector('#success').content;
const sendTemplateError = document.querySelector('#error').content;
const templateError = document.querySelector('#data-error').content;
let isInfoModalOpen = false;

const setInfoModelHandler = (modal, button) => {
  const closeInfoModalHandler = () => {
    modal.remove();
    isInfoModalOpen = false;
    cleanInfoModalHandler();
  };

  const closeInfoModalKeyHandler = (evt) => {
    if(evt.key === 'Escape' && isInfoModalOpen) {
      modal.remove();
      isInfoModalOpen = false;
      cleanInfoModalHandler();
    }
  };

  function cleanInfoModalHandler() {
    button.removeEventListener('click', closeInfoModalHandler);
    document.removeEventListener('keydown', closeInfoModalKeyHandler);
    document.removeEventListener('click', closeInfoModalHandler);
    modal.children[0].removeEventListener('click', stopsSpread);
  }

  button.addEventListener('click', closeInfoModalHandler);
  document.addEventListener('keydown', closeInfoModalKeyHandler);
  document.addEventListener('click', closeInfoModalHandler);
  modal.children[0].addEventListener('click', stopsSpread);
};

const addTemplateHandler = (modalClassName) => {
  const modal = document.querySelector(`.${modalClassName}`);
  const modalButton = document.querySelector(`.${modalClassName}__button`);
  setInfoModelHandler(modal, modalButton);
  isInfoModalOpen = true;
};

const renderModal = (template, handler = null) => {
  const fragment = document.createDocumentFragment();
  const templateInstanse = template.cloneNode(true);
  const modalClassName = templateInstanse.children[0].className;
  fragment.appendChild(templateInstanse);
  document.body.appendChild(fragment);
  if(handler) {
    handler(modalClassName);
  }
};

const renderSuccessModal = () => {
  renderModal(sendTemplateSuccess, (modalClassName) => {
    addTemplateHandler(modalClassName);
  });
};

const renderFailedModal = () => {
  renderModal(sendTemplateError, (modalClassName) => {
    addTemplateHandler(modalClassName);
  });
};

const renderMessageError = () => {
  renderModal(templateError);
  setTimeout(() => {
    const containerError = document.querySelector('.data-error');
    containerError.remove();
  }, TIME_HIDDEN_ERROR);
};

const buttonCloseHandler = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  uploadFile.value = '';
  resetPrestine();
  resetSlider();
  uploadForm.removeEventListener('submit', userFormSubmitHandler);
  inputHashtags.removeEventListener('keydown', stopsSpread);
  inputDescription.removeEventListener('keydown', stopsSpread);
  document.removeEventListener('keydown', keyCloseHandler);
  scale.removeEventListener('click', resizeHandler);
  effectList.removeEventListener('change', addedEffectHandler);
  buttonClose.removeEventListener('click', buttonCloseHandler);
};

function keyCloseHandler(evt) {
  if(evt.key === 'Escape' && !isInfoModalOpen) {
    buttonCloseHandler();
  }
}

function stopsSpread(evt) {
  evt.stopPropagation();
}


uploadFile.addEventListener('change', () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if(matches) {
    const urlFile = URL.createObjectURL(file);
    uploadPreview.src = urlFile;
    uploadEffectsPreview.forEach((el) => {
      el.style.backgroundImage = `url(${urlFile})`;
    });
  }
  checkHiddenSlider();
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadForm.addEventListener('submit', userFormSubmitHandler);
  buttonClose.addEventListener('click', buttonCloseHandler);
  document.addEventListener('keydown', keyCloseHandler);
  inputHashtags.addEventListener('keydown', stopsSpread);
  inputDescription.addEventListener('keydown', stopsSpread);
  scale.addEventListener('click', resizeHandler);
  effectList.addEventListener('change', addedEffectHandler);
});

export{
  renderSuccessModal,
  renderFailedModal,
  renderMessageError,
  buttonCloseHandler,
};
