const checkStringLength = (string, length) => string.length <= length;

checkStringLength('проверяемая строка', 10);


function validatePalindrome(string) {
  string = string.replaceAll(' ', '').toLowerCase();
  let result = '';
  for(let i = string.length - 1; i >= 0; i--) {
    result += string[i];
  }
  return string === result;
}

validatePalindrome('Лёша на полке клопа нашёл');


function getNumberFromString(string) {
  string = string.toString().replaceAll(' ', '');
  let result = '';
  for(let i = 0; i < string.length; i++) {
    if(Number.isNaN(parseInt(string[i], 10))){
      continue;
    }
    result += string[i];
  }

  return parseInt(result, 10);
}

getNumberFromString('ECMAScript 2022');

const checksDurationMeeting = (startWorks, endWorks, startMeeting, durationMeeting) => {
  startWorks = startWorks.split(':');
  endWorks = endWorks.split(':');
  startMeeting = startMeeting.split(':');


  const startWorksMin = +(startWorks[0] * 60) + + startWorks[1];
  const endWorksMin = +(endWorks[0] * 60) + + endWorks[1];
  const startMeetingMin = +(startMeeting[0] * 60) + + startMeeting[1];
  const endMeetingMin = startMeetingMin + durationMeeting;
  return startWorksMin <= startMeetingMin && endWorksMin >= endMeetingMin;
};

checksDurationMeeting('8:0', '10:0', '8:0', 120);
