const TIME_DELAY = 500;
const createIDGenerator = () => {
  let lastCreateID = 0;
  return function() {
    lastCreateID++;
    return lastCreateID;
  };
};

const createRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const returnUniqueRandomNumber = (min, max) => {
  const previousValue = [];

  return () => {
    let uniqueNumber = createRandomNumber(min, max);
    if(previousValue.length >= 10) {
      return null;
    }
    while (previousValue.includes(uniqueNumber)) {
      uniqueNumber = createRandomNumber(min, max);
    }
    previousValue.push(uniqueNumber);
    return uniqueNumber;
  };
};

const debounce = (callBack, timeoutDelay = TIME_DELAY) => {
  let timeID;
  return (...rest) => {
    clearTimeout(timeID);
    timeID = setTimeout(() => callBack.apply(this, rest),timeoutDelay);
  };
};


export {
  createIDGenerator,
  createRandomNumber,
  returnUniqueRandomNumber,
  debounce,
};
