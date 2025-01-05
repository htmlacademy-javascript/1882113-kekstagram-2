import {
  createPhotoData,
  NUMBER_OF_OBJECTS_GENERATED,
} from './create-foto-data.js';
const template = document.querySelector('#picture').content;
const miniaturesData = createPhotoData(NUMBER_OF_OBJECTS_GENERATED);
const fragment = document.createDocumentFragment();
const pictures = document.querySelector('.pictures');

miniaturesData.forEach(({description, likes, url, comments}) => {
  const templateItem = template.cloneNode(true);
  templateItem.querySelector('.picture__img').src = url;
  templateItem.querySelector('.picture__img').alt = description;
  templateItem.querySelector('.picture__likes').textContent = likes;
  templateItem.querySelector('.picture__comments').textContent = comments.length;
  fragment.appendChild(templateItem);
});

pictures.appendChild(fragment);
