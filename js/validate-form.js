const uploadForm = document.querySelector('.img-upload__form');
const inputHashtags = uploadForm.querySelector('.text__hashtags');
const inputDescription = uploadForm.querySelector('.text__description');
const patternHashtags = /^#[a-zа-яё0-9]{1,19}$/i;
let string;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
}, true);

const errorText = () => `${string}`;

const validateHashtags = (value)=> {
  const validateArray = value.split(' ');
  if(validateArray.length <= 5) {
    for(let i = 0; i < validateArray.length; i++) {
      for(let j = i + 1; j < validateArray.length; j++) {
        if(validateArray[j] === validateArray[i]) {
          string = 'хэштеги повторяются';
          console.log('не верно');
          return false;
        }
      }
      if(validateArray[i] !== '') {
        const isValid = patternHashtags.test(validateArray[i]);
        if(!isValid) {
          console.log('не верно');
          string = 'введён невалидный хэштег';
          return false;
        }
      }
    }
    console.log('валидно');
    return true;
  }
  console.log('не верно');
  string = 'превышено количество хэштегов';
  return false;


};

const validateSringLength = (value) => {
  if(value.length > 140) {
    string = 'длина комментария больше 140 символов';
    return false;
  }
  return true;
};


pristine.addValidator(inputHashtags, validateHashtags, errorText);
pristine.addValidator(inputDescription, validateSringLength, errorText);


uploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if(isValid) {
    console.log('1');
  } else {
    evt.preventDefault();
    console.log('2');
  }
});
