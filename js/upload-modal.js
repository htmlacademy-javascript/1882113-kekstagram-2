import {resizeHendler} from './resize-img.js';
import {
  addedEffectHendler,
  resetSlider,
  checkHiddenSlider,
} from './slider.js';
import {resetPrestine} from './validate-form.js';
const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const buttonClose = uploadOverlay.querySelector('.img-upload__cancel');
const inputHashtags = uploadOverlay.querySelector('.text__hashtags');
const inputDescription = uploadOverlay.querySelector('.text__description');
const effectList = document.querySelector('.effects__list');
const scale = uploadOverlay.querySelector('.scale');
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

const rendeFragment = (template) => {
  const fragment = document.createDocumentFragment();
  const templateInstanse = template.cloneNode(true);
  const modalClassName = templateInstanse.children[0].className;
  fragment.appendChild(templateInstanse);
  document.body.appendChild(fragment);
  return modalClassName;
};

const renderInfoModal = (template) => {
  const modalClassName = rendeFragment(template);
  const modal = document.querySelector(`.${modalClassName}`);
  const modalButton = document.querySelector(`.${modalClassName}__button`);
  setInfoModelHandler(modal, modalButton);
  isInfoModalOpen = true;
};

const renderMessageError = () => {
  const templateError = document.querySelector('#data-error').content;
  rendeFragment(templateError);
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
  checkHiddenSlider();
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  buttonClose.addEventListener('click', buttonCloseHendler);
  document.addEventListener('keydown', keyCloseHendler);
  inputHashtags.addEventListener('keydown', stopsSpread);
  inputDescription.addEventListener('keydown', stopsSpread);
  scale.addEventListener('click', resizeHendler);
  effectList.addEventListener('change', addedEffectHendler);
});

export{
  renderInfoModal,
  renderMessageError,
  buttonCloseHendler,
};
