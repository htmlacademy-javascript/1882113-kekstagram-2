const TIME_DELAY = 500;
const createIDGenerator = () => {
  let lastCreateID = 0;
  return function() {
    lastCreateID++;
    return lastCreateID;
  };
};

// const createRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);
const createRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const returnUniqueID = (min, max) => {
  const previousValue = [];

  return () => {
    let uniqueId = createRandomNumber(min, max);
    if(previousValue.length >= 25) {
      // console.error('Перебраны все числа из диапазона');
      return null;
    }
    while (previousValue.includes(uniqueId)) {
      uniqueId = createRandomNumber(min, max);
    }
    previousValue.push(uniqueId);
    return uniqueId;
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
  returnUniqueID,
  debounce,
};
