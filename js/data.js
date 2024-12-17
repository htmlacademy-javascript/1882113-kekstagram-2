import { createIDGenerator } from './util.js';
import {createRandomNumber} from './util.js';
import {returnUniqueID} from './util.js';
const DESCRIPTIONS_PHOTO = [
  'Красивый вид',
  'Получилось хорошее фото',
  'Смотрится очень здорово',
  'Снято в спешке',
  'Старались чтобы всё поместилось в кадр',
  'Вышло не плохо на мой взгляд',
];

// const NUMBER_OF_OBJECTS_GENERATED = 25;

const QUANTITY_LIKES = {
  MIN: 15,
  MAX: 200,
};

const COMMENTS_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const AUTHORS_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
];


const createIDPhoto = createIDGenerator();
const createIDUrl = createIDGenerator();

const createUniqueID = returnUniqueID(1, 1000);

const createListComments = (min, max) => {
  const commentsList = [];
  const iterationNumber = createRandomNumber(min, max);
  for(let i = 0; i <= iterationNumber; i++) {
    commentsList.push({
      id: createUniqueID(),
      avatar: `img/avatar-${createRandomNumber(1, 6)}.svg`,
      message: COMMENTS_MESSAGES[createRandomNumber(0, 5)],
      name: AUTHORS_NAMES[createRandomNumber(0, 5)],
    });
  }
  return commentsList;
};

const createPhotoData = (quantityObject) => {
  const objectList = [];
  for(let i = 0; i <= quantityObject - 1; i++) {
    objectList.push({
      id: createIDPhoto(),
      url:`photos/${createIDUrl()}.jpg`,
      description: DESCRIPTIONS_PHOTO[createRandomNumber(0, 5)],
      likes: createRandomNumber(QUANTITY_LIKES.MIN, QUANTITY_LIKES.MAX),
      comments: createListComments(0, 30),
    });
  }
  return objectList;
};

export {createPhotoData};
