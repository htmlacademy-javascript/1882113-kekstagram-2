const VALIDATE_MESSAGE = {
  'invalid hashtag': 'введён невалидный хэштег',
  'repeat hashtags': 'хэштеги повторяются',
  'exceeded quantity hashtags': 'превышено количество хэштегов',
  'comment max length': 'длина комментария больше 140 символов',
};
const uploadForm = document.querySelector('.img-upload__form');
const inputHashtags = uploadForm.querySelector('.text__hashtags');
const inputDescription = uploadForm.querySelector('.text__description');
const patternHashtags = /^#[a-zа-яё0-9]{1,19}$/i;
let errorString;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
}, true);

const errorText = () => `${errorString}`;

const validateHashtags = (value)=> {
  const validateArray = value.split(' ');
  if(validateArray.length <= 5) {
    for(let i = 0; i < validateArray.length; i++) {
      for(let j = i + 1; j < validateArray.length; j++) {
        if(validateArray[j] === validateArray[i]) {
          errorString = VALIDATE_MESSAGE['repeat hashtags'];
          return false;
        }
      }
      if(validateArray[i] !== '') {
        const isValid = patternHashtags.test(validateArray[i]);
        if(!isValid) {
          errorString = VALIDATE_MESSAGE['invalid hashtag'];
          return false;
        }
      }
    }
    return true;
  }
  errorString = VALIDATE_MESSAGE['exceeded quantity hashtags'];
  return false;


};

const validateSringLength = (value) => {
  if(value.length > 140) {
    errorString = VALIDATE_MESSAGE['comment max length'];
    return false;
  }
  return true;
};


pristine.addValidator(inputHashtags, validateHashtags, errorText);
pristine.addValidator(inputDescription, validateSringLength, errorText);


uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid) {
    console.log('Форма отправлена');
  } else {
    console.log('Форма не отправлена');
  }
});
