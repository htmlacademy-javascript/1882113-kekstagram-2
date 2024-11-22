const stringLength = (string, length) => string.length <= length;

stringLength('проверяемая строка', 10);


function validatePalindrome(string) {
  string = string.replaceAll(' ', '').toLowerCase();
  let result = '';
  for(let i = string.length - 1; i >= 0; i--) {
    result += string[i];
  }
  return string === result;
}

validatePalindrome('Лёша на полке клопа нашёл');


function returnNumberString(string) {
  string = string.toString().replaceAll(' ', '');
  let result = '';
  for(let i = 0; i < string.length; i++) {
    if(Number.isNaN(parseInt(string[i], 10))){
      continue;
    }
    result += string[i];
  }
  if(result === '') {
    return NaN;
  }
  return +result;
}

returnNumberString('ECMAScript 2022');
