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

  const durationMeetingMin = durationMeeting % 60;
  const durationMeetingHour = (durationMeeting - durationMeetingMin) / 60;
  const startWorksNumber = +`${startWorks[0]}.${startWorks[1]}`;
  const endtWorksNumber = +`${endWorks[0]}.${endWorks[1]}`;
  const startMeetingNumber = +`${startMeeting[0]}.${startMeeting[1]}`;
  const durationMeetingNumber = +`${durationMeetingHour}.${durationMeetingMin}`;
  const endMeeting = startMeetingNumber + durationMeetingNumber;

  if(startWorksNumber <= startMeetingNumber && endtWorksNumber >= endMeeting) {
    return true;
  }
  return false;
};

checksDurationMeeting('08:00', '17:30', '14:00', 90);
