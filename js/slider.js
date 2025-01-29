const EFFECT = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness',
};
const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectList = document.querySelector('.effects__list');
const uploadPreview = document.querySelector('.img-upload__preview');
const effectLevel = document.querySelector('.effect-level');

effectLevel.classList.add('hidden');

let stringEffect;
let percent = false;
let pixel = false;


noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
});

const changesIntensity = (string, value,) => {
  if(percent) {
    return `${string }(${value}%)`;
  } else if (pixel) {
    return `${string }(${value}px)`;
  }
  return `${string }(${value})`;
};


effectSlider.noUiSlider.on('update', () => {
  effectValue.value = effectSlider.noUiSlider.get();
  uploadPreview.style.filter = changesIntensity(stringEffect, effectValue.value);
});

const checkEffect = (evt) => {
  if(evt.target.value === 'none') {
    effectLevel.classList.add('hidden');
    uploadPreview.removeAttribute('style');
  } else {
    effectLevel.classList.remove('hidden');
  }
  if (evt.target.value === 'chrome') {
    uploadPreview.removeAttribute('style');
    stringEffect = EFFECT.chrome;
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 0,
      step: 0.1,
    });
    percent = false;
    pixel = false;
  } else if (evt.target.value === 'sepia') {
    uploadPreview.removeAttribute('style');
    stringEffect = EFFECT.sepia;
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 0,
      step: 0.1,
    });
    percent = false;
    pixel = false;
  } else if(evt.target.value === 'marvin') {
    uploadPreview.removeAttribute('style');
    stringEffect = EFFECT.marvin;
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 0,
      step: 1,
    });
    percent = true;
    pixel = false;
  } else if (evt.target.value === 'phobos') {
    uploadPreview.removeAttribute('style');
    stringEffect = EFFECT.phobos;
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 0,
      step: 0.1,
    });
    percent = false;
    pixel = true;
  } else if(evt.target.value === 'heat') {
    uploadPreview.removeAttribute('style');
    stringEffect = EFFECT.heat;
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 1,
      step: 0.1,
    });
    percent = false;
    pixel = false;
  }
};

effectList.addEventListener('change', checkEffect);
