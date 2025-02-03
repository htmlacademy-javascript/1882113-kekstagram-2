const SLIDER__SETTING = {
  chrome: {
    effect: 'grayscale',
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
  },
  sepia: {
    effect: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
  },
  marvin:{
    effect: 'invert',
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
    step: 1,
    unit: '%',
  },
  phobos: {
    effect: 'blur',
    range: {
      min: 0,
      max: 3,
    },
    start: 0,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    effect: 'brightness',
    range: {
      min: 1,
      max: 3,
    },
    start: 1,
    step: 0.1,
  },
};
const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const uploadPreview = document.querySelector('.img-upload__preview');
const effectLevel = document.querySelector('.img-upload__effect-level');
effectLevel.classList.add('hidden');

let currentSetting;


noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
});

const changesIntensity = (effect, value, unit = '') =>
  `${effect}(${value}${unit})`;


effectSlider.noUiSlider.on('slide', () => {
  effectValue.value = effectSlider.noUiSlider.get();
  uploadPreview.style.filter = changesIntensity(currentSetting.effect, effectValue.value, currentSetting.percent, currentSetting.pixel);
});

function checkEffect(evt) {
  uploadPreview.removeAttribute('style');
  if(evt.target.value === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectSlider.noUiSlider.updateOptions(SLIDER__SETTING[evt.target.value]);
    currentSetting = SLIDER__SETTING[evt.target.value];
    effectLevel.classList.remove('hidden');
  }
}

export {checkEffect,};
