import {
  createPhotoData,
  NUMBER_OF_OBJECTS_GENERATED,
} from './create-foto-data.js';
const template = document.querySelector('#picture').content;
const thumbnailsData = createPhotoData(NUMBER_OF_OBJECTS_GENERATED);
const fragment = document.createDocumentFragment();
const pictures = document.querySelector('.pictures');

const createThumbnails = ({description, id, likes, url, comments}) => {
  const templateItem = template.cloneNode(true);
  const thumbnail = templateItem.querySelector('.picture__img');
  const thumbnailLink = templateItem.querySelector('.picture');
  thumbnailLink.dataset.imageId = id;
  thumbnail.src = url;
  thumbnail.alt = description;
  templateItem.querySelector('.picture__likes').textContent = likes;
  templateItem.querySelector('.picture__comments').textContent = comments.length;
  return templateItem;
};

thumbnailsData.forEach((thumbnailData) => {
  fragment.appendChild(createThumbnails(thumbnailData));
});

pictures.appendChild(fragment);

export {thumbnailsData};
