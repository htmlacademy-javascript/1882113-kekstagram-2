const DESCRIPTION_PHOTO = [
  'Красивый вид',
  'Получилось хорошее фото',
  'Смотрится очень здорово',
  'Снято в спешке',
  'Старались чтобы всё поместилось в кадр',
  'Вышло не плохо на мой взгляд',
];

const NUMBER_OF_OBJECTS_GENERATED = 25;

const COMMENT_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const AUTHOR_NAME = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
];

const createIDGenerator = () => {
  let lastCreateID = 0;
  return function() {
    lastCreateID++;
    return lastCreateID;
  };
};

const createIDPhoto = createIDGenerator();
const createIDUrl = createIDGenerator();

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

const createUniqueID = returnUniqueID(1, 1000);

const createListComments = (min, max) => {
  const commentsList = [];
  const iterationNumber = createRandomNumber(min, max);
  for(let i = 0; i <= iterationNumber; i++) {
    commentsList[i] = {
      id: createUniqueID(),
      avatar: `img/avatar-${createRandomNumber(1, 6)}.svg`,
      message: COMMENT_MESSAGE[createRandomNumber(0, 5)],
      name: AUTHOR_NAME[createRandomNumber(0, 5)],
    };
  }
  return commentsList;
};

const createPhotoData = (quantityObject) => {
  const objectList = [];
  const iterationNumber = quantityObject;
  for(let i = 0; i <= iterationNumber - 1; i++) {
    objectList[i] = {
      id: createIDPhoto(),
      url:`photos/${createIDUrl()}.jpg`,
      description: DESCRIPTION_PHOTO[createRandomNumber(0, 5)],
      likes: createRandomNumber(15, 200),
      comments: createListComments(0, 30),
    };
  }
  return objectList;
};

createPhotoData(NUMBER_OF_OBJECTS_GENERATED);

