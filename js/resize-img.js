const STEP = {
  SCALE: 0.25,
  VALUE: 25,
};

const scaleValue = document.querySelector('.scale__control--value');
const resizeImage = document.querySelector('.img-upload__preview > img');
let scaleNumber = 1;
let scaleValueNumber = 100;

const resizeHendler = (evt) => {
  if(evt.target.className.includes('smaller')) {
    if(scaleValueNumber > 25) {
      resizeImage.style.transform = `scale(${scaleNumber -= STEP.SCALE})`;
      scaleValue.value = `${scaleValueNumber -= STEP.VALUE}%`;
    }
  }else if(evt.target.className.includes('bigger')) {
    if(scaleValueNumber < 100) {
      resizeImage.style.transform = `scale(${scaleNumber += STEP.SCALE})`;
      scaleValue.value = `${scaleValueNumber += STEP.VALUE}%`;
    }
  }
};

export {resizeHendler};
