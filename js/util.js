const createIDGenerator = () => {
  let lastCreateID = 0;
  return function() {
    lastCreateID++;
    return lastCreateID;
  };
};

const createRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);

const returnUniqueID = (min, max) => {
  const previousValue = [];

  return () => {
    let uniqueId = createRandomNumber(min, max);
    if(previousValue.length >= max) {
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
export {
  createIDGenerator,
  createRandomNumber,
  returnUniqueID
};
