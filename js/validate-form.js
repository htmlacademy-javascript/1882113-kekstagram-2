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
let errorKey;


const errorText = () => VALIDATE_MESSAGE[errorKey];

const validateHashtags = (value)=> {
  const validateArray = value.replace(/\s+/g, ' ').toLowerCase().trim().split(' ');
  if(validateArray.length <= 5) {
    for(let i = 0; i < validateArray.length; i++) {
      for(let j = i + 1; j < validateArray.length; j++) {
        if(validateArray[j] === validateArray[i]) {
          errorKey = 'repeat hashtags';
          return false;
        }
      }
      if(validateArray[i] !== '') {
        const isValid = patternHashtags.test(validateArray[i]);
        if(!isValid) {
          errorKey = 'invalid hashtag';
          return false;
        }
      }
    }
    return true;
  }
  errorKey = 'exceeded quantity hashtags';
  return false;

};

const validateSringLength = (value) => {
  if(value.length > 140) {
    errorKey = 'comment max length';
    return false;
  }
  return true;
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
}, true);


pristine.addValidator(inputHashtags, validateHashtags, errorText);
pristine.addValidator(inputDescription, validateSringLength, errorText);


uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid) {
    // console.log('Форма отправлена');
  } else {
    // console.log('Форма не отправлена');
  }
});

function resetPrestine () {
  pristine.reset();
}

export{resetPrestine};
