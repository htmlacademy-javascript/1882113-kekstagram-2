import {
  onResizeButtonClick,
  removeResizeData,
} from './resize-img.js';
import {
  onEffectRadioClick,
  resetSlider,
  checkHiddenSlider,
} from './slider.js';
import {
  resetPrestine,
  onButtonFormSubmit,
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

const setInfoModelHandler = (modal, buttonSuccess) => {
  const onButtonSuccessClick = () => {
    modal.remove();
    isInfoModalOpen = false;
    cleanInfoModalHandler();
  };

  const onDocumentKeydownCloseModalInfo = (evt) => {
    if(evt.key === 'Escape' && isInfoModalOpen) {
      modal.remove();
      isInfoModalOpen = false;
      cleanInfoModalHandler();
    }
  };

  function cleanInfoModalHandler() {
    buttonSuccess.removeEventListener('click', onButtonSuccessClick);
    document.removeEventListener('keydown', onDocumentKeydownCloseModalInfo);
    document.removeEventListener('click', onButtonSuccessClick);
    modal.children[0].removeEventListener('click', onEventStopPropagation);
  }

  buttonSuccess.addEventListener('click', onButtonSuccessClick);
  document.addEventListener('keydown', onDocumentKeydownCloseModalInfo);
  document.addEventListener('click', onButtonSuccessClick);
  modal.children[0].addEventListener('click', onEventStopPropagation);
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

const onButtonCloseUploadModal = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  uploadFile.value = '';
  resetPrestine();
  resetSlider();
  removeResizeData();
  uploadForm.removeEventListener('submit', onButtonFormSubmit);
  inputHashtags.removeEventListener('keydown', onEventStopPropagation);
  inputDescription.removeEventListener('keydown', onEventStopPropagation);
  document.removeEventListener('keydown', onDocumentClosePictureModal);
  scale.removeEventListener('click', onResizeButtonClick);
  effectList.removeEventListener('change', onEffectRadioClick);
  buttonClose.removeEventListener('click', onButtonCloseUploadModal);
};

function onDocumentClosePictureModal(evt) {
  if(evt.key === 'Escape' && !isInfoModalOpen) {
    onButtonCloseUploadModal();
  }
}

function onEventStopPropagation(evt) {
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
  uploadForm.addEventListener('submit', onButtonFormSubmit);
  buttonClose.addEventListener('click', onButtonCloseUploadModal);
  document.addEventListener('keydown', onDocumentClosePictureModal);
  inputHashtags.addEventListener('keydown', onEventStopPropagation);
  inputDescription.addEventListener('keydown', onEventStopPropagation);
  scale.addEventListener('click', onResizeButtonClick);
  effectList.addEventListener('change', onEffectRadioClick);
});

export{
  renderSuccessModal,
  renderFailedModal,
  renderMessageError,
  onButtonCloseUploadModal,
};
