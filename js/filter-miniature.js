import {returnUniqueID} from './util.js';
const blockFilters = document.querySelector('.img-filters');
const filterForm = blockFilters.querySelector('.img-filters__form');
const arrButtonsFilter = filterForm.querySelectorAll('button');

const doesFiltration = (arr) => {
  arr.sort((a, b) => {
    if(a.comments.length > b.comments.length) {
      return -1;
    }
  });
  return arr;
};

const showBlockFilters = (cb = null, arr) => {
  blockFilters.classList.remove('img-filters--inactive');
  const copyDatasets = arr.slice();

  return (evt) => {
    const arrPictures = document.querySelectorAll('.picture');
    arrButtonsFilter.forEach((button) => button.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    arrPictures.forEach((item) => item.remove());
    if(evt.target.id === 'filter-default') {
      cb(arr);
    }
    if(evt.target.id === 'filter-random') {
      const randomUniqueNumber = returnUniqueID(0, 24);
      const arrRandomThumbnails = [];
      arr.forEach((item) => {
        arrRandomThumbnails[randomUniqueNumber()] = item;
      });
      cb(arrRandomThumbnails);
    }
    if(evt.target.id === 'filter-discussed') {
      cb(doesFiltration(copyDatasets));
    }
  };
};
export {showBlockFilters};
