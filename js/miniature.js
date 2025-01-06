import {
  createPhotoData,
  NUMBER_OF_OBJECTS_GENERATED,
} from './create-foto-data.js';
const template = document.querySelector('#picture').content;
const thumbnailsData = createPhotoData(NUMBER_OF_OBJECTS_GENERATED);
const fragment = document.createDocumentFragment();
const pictures = document.querySelector('.pictures');

const createMiniatures = ({description, likes, url, comments}) => {
  const templateItem = template.cloneNode(true);
  const thumbnail = templateItem.querySelector('.picture__img');
  thumbnail.src = url;
  thumbnail.alt = description;
  templateItem.querySelector('.picture__likes').textContent = likes;
  templateItem.querySelector('.picture__comments').textContent = comments.length;
  return templateItem;
};

thumbnailsData.forEach((thumbnailData) => {
  fragment.appendChild(createMiniatures(thumbnailData));
});

pictures.appendChild(fragment);
