import {
  createIDGenerator,
  createRandomNumber,
  returnUniqueID,
} from './util.js';
import {returnDataForObject} from './data.js';

const {DESCRIPTIONS_PHOTO, QUANTITY_LIKES, COMMENTS_MESSAGES, AUTHORS_NAMES} = returnDataForObject();

const NUMBER_OF_OBJECTS_GENERATED = 25;

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

const createPhotoData = (quantityObject = NUMBER_OF_OBJECTS_GENERATED) => {
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

export {
  createPhotoData,
  NUMBER_OF_OBJECTS_GENERATED,
};
