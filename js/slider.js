// const scale = document.querySelector('.scale');
const scaleSmall = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const resizeImage = document.querySelector('.img-upload__preview > img');
let scaleNumber = 1;
let scaleValueNumber = 100;

export const resizeHendler = (evt) => {
  if(evt.target.className.includes('smaller')) {
    if(scaleValueNumber > 25) {
      resizeImage.style.transform = `scale(${scaleNumber -= 0.25})`;
      scaleValue.value = `${scaleValueNumber -= 25}%`;
    }
  }else if(evt.target.className.includes('bigger')) {
    if(scaleValueNumber < 100) {
      scaleValue.value = `${scaleValueNumber += 25}%`;
      resizeImage.style.transform = `scale(${scaleNumber += 0.25})`;
    }
  }
};


// let a = 1;
// let b = 100;
// scale.addEventListener('click', (evt) => {
//   if(evt.target.className.includes('smaller')) {
//     if(b > 25) {
//       resizeImage.style.transform = `scale(${a -= 0.25})`;
//       scaleValue.value = `${b -= 25}%`;
//     }
//   }else if(evt.target.className.includes('bigger')) {
//     if(b < 100) {
//       scaleValue.value = `${b += 25}%`;
//       resizeImage.style.transform = `scale(${a += 0.25})`;
//     }
//   }
// });
