import {resizeHendler} from './resize-img.js';
import {
  addedEffectHendler,
  resetSlider,
  checkHiddenSlider,
} from './slider.js';
import {
  resetPrestine,
  userFormSubmitHendler,
} from './validate-form.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const buttonClose = uploadOverlay.querySelector('.img-upload__cancel');
const uploadPreview = uploadOverlay.querySelector('.img-upload__preview img');
const uploadEffectPreview = uploadOverlay.querySelectorAll('.effects__preview');
const inputHashtags = uploadOverlay.querySelector('.text__hashtags');
const inputDescription = uploadOverlay.querySelector('.text__description');
const effectList = document.querySelector('.effects__list');
const scale = uploadOverlay.querySelector('.scale');
const sendTemplateSuccess = document.querySelector('#success').content;
const sendTemplateError = document.querySelector('#error').content;
const templateError = document.querySelector('#data-error').content;
let isInfoModalOpen = false;

const setInfoModelHandler = (modal, button) => {
  const closeInfoModlaHendler = () => {
    modal.remove();
    isInfoModalOpen = false;
    cleanInfoModalHendler();
  };

  const closeInfoModlaKeyHendler = (evt) => {
    if(evt.key === 'Escape' && isInfoModalOpen) {
      modal.remove();
      isInfoModalOpen = false;
      cleanInfoModalHendler();
    }
  };

  function cleanInfoModalHendler() {
    button.removeEventListener('click', closeInfoModlaHendler);
    document.removeEventListener('keydown', closeInfoModlaKeyHendler);
    document.removeEventListener('click', closeInfoModlaHendler);
    modal.children[0].removeEventListener('click', stopsSpread);
  }

  button.addEventListener('click', closeInfoModlaHendler);
  document.addEventListener('keydown', closeInfoModlaKeyHendler);
  document.addEventListener('click', closeInfoModlaHendler);
  modal.children[0].addEventListener('click', stopsSpread);
};

const addTemplateHendler = (modalClassName) => {
  const modal = document.querySelector(`.${modalClassName}`);
  const modalButton = document.querySelector(`.${modalClassName}__button`);
  setInfoModelHandler(modal, modalButton);
  isInfoModalOpen = true;
};

const renderModal = (template, hendler = null) => {
  const fragment = document.createDocumentFragment();
  const templateInstanse = template.cloneNode(true);
  const modalClassName = templateInstanse.children[0].className;
  fragment.appendChild(templateInstanse);
  document.body.appendChild(fragment);
  if(hendler) {
    hendler(modalClassName);
  }
};

const renderSuccessModal = () => {
  renderModal(sendTemplateSuccess, (modalClassName) => {
    addTemplateHendler(modalClassName);
  });
};

const renderFailedModal = () => {
  renderModal(sendTemplateError, (modalClassName) => {
    addTemplateHendler(modalClassName);
  });
};

const renderMessageError = () => {
  renderModal(templateError);
  setTimeout(() => {
    const containerError = document.querySelector('.data-error');
    containerError.remove();
  }, 5000);
};

const buttonCloseHendler = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  uploadFile.value = '';
  resetPrestine();
  resetSlider();
  uploadForm.removeEventListener('submit', userFormSubmitHendler);
  inputHashtags.removeEventListener('keydown', stopsSpread);
  inputDescription.removeEventListener('keydown', stopsSpread);
  document.removeEventListener('keydown', keyCloseHendler);
  scale.removeEventListener('click', resizeHendler);
  effectList.removeEventListener('change', addedEffectHendler);
  buttonClose.removeEventListener('click', buttonCloseHendler);
};

function keyCloseHendler(evt) {
  if(evt.key === 'Escape' && !isInfoModalOpen) {
    buttonCloseHendler();
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
    uploadEffectPreview.forEach((el) => {
      el.style.backgroundImage = `url(${urlFile})`;
    });
  }
  checkHiddenSlider();
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadForm.addEventListener('submit', userFormSubmitHendler);
  buttonClose.addEventListener('click', buttonCloseHendler);
  document.addEventListener('keydown', keyCloseHendler);
  inputHashtags.addEventListener('keydown', stopsSpread);
  inputDescription.addEventListener('keydown', stopsSpread);
  scale.addEventListener('click', resizeHendler);
  effectList.addEventListener('change', addedEffectHendler);
});

export{
  renderSuccessModal,
  renderFailedModal,
  renderMessageError,
  buttonCloseHendler,
};
