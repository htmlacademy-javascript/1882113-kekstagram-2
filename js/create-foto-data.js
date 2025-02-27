import {
  createIDGenerator,
  createRandomNumber,
  returnUniqueRandomNumber,
} from './util.js';
import {returnDataForObject} from './data.js';

const {DESCRIPTIONS_PHOTO, QUANTITY_LIKES, COMMENTS_MESSAGES, AUTHORS_NAMES} = returnDataForObject();

const RANGE_RANDOM_NUMBER = {
  MIN: 1,
  MAX: 1000,
};

const RANGE_RANDOM_URL_NUMBER = {
  MIN: 1,
  MAX: 6,
};

const RANGE_RANDOM_INDEX_NUMBER = {
  MIN: 0,
  MAX: 5,
};

const RANGE_QUANTITY_COMMENT = {
  MIN: 0,
  MAX: 30,
};

const NUMBER_OF_OBJECTS_GENERATED = 25;

const createIDPhoto = createIDGenerator();
const createIDUrl = createIDGenerator();

const createUniqueID = returnUniqueRandomNumber(RANGE_RANDOM_NUMBER.MIN, RANGE_RANDOM_NUMBER.MAX);

const createListComments = (min, max) => {
  const commentsList = [];
  const iterationNumber = createRandomNumber(min, max);
  for(let i = 0; i <= iterationNumber; i++) {
    commentsList.push({
      id: createUniqueID(),
      avatar: `img/avatar-${createRandomNumber(RANGE_RANDOM_URL_NUMBER.MIN, RANGE_RANDOM_URL_NUMBER.MAX)}.svg`,
      message: COMMENTS_MESSAGES[createRandomNumber(RANGE_RANDOM_INDEX_NUMBER.MIN, RANGE_RANDOM_INDEX_NUMBER.MAX)],
      name: AUTHORS_NAMES[createRandomNumber(RANGE_RANDOM_INDEX_NUMBER.MIN, RANGE_RANDOM_INDEX_NUMBER.MAX)],
    });
  }
  return commentsList;
};

const createPhotoData = (quantityObject = NUMBER_OF_OBJECTS_GENERATED) => {
  const objectList = [];
  for(let i = 0; i <= quantityObject - 1; i++) {
    objectList.push({
      id: createIDPhoto(),
      url:`photos/${createIDUrl()}.jpg`,
      description: DESCRIPTIONS_PHOTO[createRandomNumber(RANGE_RANDOM_INDEX_NUMBER.MIN, RANGE_RANDOM_INDEX_NUMBER.MAX)],
      likes: createRandomNumber(QUANTITY_LIKES.MIN, QUANTITY_LIKES.MAX),
      comments: createListComments(RANGE_QUANTITY_COMMENT.MIN, RANGE_QUANTITY_COMMENT.MAX),
    });
  }
  return objectList;
};

export {
  createPhotoData,
  NUMBER_OF_OBJECTS_GENERATED,
};
