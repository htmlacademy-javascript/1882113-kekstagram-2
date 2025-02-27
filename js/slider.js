const SLIDER__SETTING = {
  chrome: {
    effect: 'grayscale',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  sepia: {
    effect: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  marvin:{
    effect: 'invert',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    effect: 'blur',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    effect: 'brightness',
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
};
const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const uploadPreview = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.img-upload__effect-level');


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

const changesIntensity = (effect, value, unit = '') => `${effect}(${value}${unit})`;


function addedEffectHandler(evt) {
  uploadPreview.removeAttribute('style');
  if(evt.target.value === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
    effectSlider.noUiSlider.updateOptions(SLIDER__SETTING[evt.target.value]);
    currentSetting = SLIDER__SETTING[evt.target.value];
    effectSlider.noUiSlider.on('update', () => {
      effectValue.value = parseFloat(effectSlider.noUiSlider.get());
      uploadPreview.style.filter = changesIntensity(currentSetting.effect, effectValue.value, currentSetting.unit);
    });
  }
}

function resetSlider() {
  effectSlider.noUiSlider.reset();
  uploadPreview.removeAttribute('style');
  effectLevel.classList.add('hidden');
}

function checkHiddenSlider() {
  const effectRadio = document.querySelectorAll('.effects__radio');
  for (let i = 0; i < effectRadio.length; i++) {
    if(effectRadio[i].value === 'none' && effectRadio[i].hasAttribute('checked')) {
      effectLevel.classList.add('hidden');
    }
  }
}

export {
  addedEffectHandler,
  resetSlider,
  checkHiddenSlider,
};
