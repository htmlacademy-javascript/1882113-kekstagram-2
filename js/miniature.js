import {thumbnailClickHendler} from './picture-modal.js';
import { showBlockFilters } from './filter-miniature.js';
import { debounce } from './util.js';
const template = document.querySelector('#picture').content;
const fragment = document.createDocumentFragment();
const pictures = document.querySelector('.pictures');
const filterForm = document.querySelector('.img-filters__form');


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
  datasets.forEach((Dataset) => {
    fragment.appendChild(createThumbnails(Dataset));
  });
  pictures.appendChild(fragment);
};

const addedThumbnails = (datasets) => {
  renderThumbnails(datasets);
  thumbnailClickHendler(datasets);
  const addFormFilterHendler = showBlockFilters(debounce(renderThumbnails, 500), datasets);
  filterForm.addEventListener('click', addFormFilterHendler);
};

export {addedThumbnails};
