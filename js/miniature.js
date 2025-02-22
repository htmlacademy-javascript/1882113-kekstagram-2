import {thumbnailClickHendler} from './picture-modal.js';
const template = document.querySelector('#picture').content;
const fragment = document.createDocumentFragment();
const pictures = document.querySelector('.pictures');


const createThumbnails = ({description, id, likes, url, comments}) => {
  const templateItem = template.cloneNode(true);
  const thumbnail = templateItem.querySelector('.picture__img');
  const thumbnailLink = templateItem.querySelector('.picture');
  thumbnailLink.id = id;
  thumbnail.src = url;
  thumbnail.alt = description;
  templateItem.querySelector('.picture__likes').textContent = likes;
  templateItem.querySelector('.picture__comments').textContent = comments.length;
  return templateItem;
};


const renderThumbnails = (datasets) => {
  datasets.forEach((dataset) => {
    fragment.appendChild(createThumbnails(dataset));
  });
  pictures.appendChild(fragment);
  thumbnailClickHendler(datasets);
};

export {renderThumbnails};
