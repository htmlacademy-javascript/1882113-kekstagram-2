import {resizeHendler} from './resize-img.js';
import {
  addedEffectHendler,
  resetSlider,
  checkHiddenSlider,
} from './slider.js';
import {resetPrestine} from './validate-form.js';
const uploadFile = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const buttonClose = uploadOverlay.querySelector('.img-upload__cancel');
const inputHashtags = uploadOverlay.querySelector('.text__hashtags');
const inputDescription = uploadOverlay.querySelector('.text__description');
const effectList = document.querySelector('.effects__list');
const scale = uploadOverlay.querySelector('.scale');
//
// uploadOverlay.classList.remove('hidden');
//

const buttonCloseHendler = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value = '';
  resetPrestine();
  resetSlider();
  inputHashtags.removeEventListener('keydown', removeCloseKeydown);
  inputDescription.removeEventListener('keydown', removeCloseKeydown);
  document.removeEventListener('keydown', keyCloseHendler);
  scale.removeEventListener('click', resizeHendler);
  effectList.removeEventListener('change', addedEffectHendler);
  buttonClose.removeEventListener('click', buttonCloseHendler);
};

function keyCloseHendler(evt) {
  if(evt.key === 'Escape') {
    buttonCloseHendler();
  }
}

function removeCloseKeydown(evt) {
  evt.stopPropagation();
}


uploadFile.addEventListener('change', () => {
  checkHiddenSlider();
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  buttonClose.addEventListener('click', buttonCloseHendler);
  document.addEventListener('keydown', keyCloseHendler);
  inputHashtags.addEventListener('keydown', removeCloseKeydown);
  inputDescription.addEventListener('keydown', removeCloseKeydown);
  scale.addEventListener('click', resizeHendler);
  effectList.addEventListener('change', addedEffectHendler);
});
