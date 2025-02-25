import {returnUniqueID} from './util.js';

const FILTER_ID = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

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

const createRandomArray = (arr) => {
  const randomArr = [];
  const randomUniqueNumber = returnUniqueID(0, 24);
  for(let i = 0; i < 10; i++) {
    [randomArr[i]] = [arr[randomUniqueNumber()]];
  }
  return randomArr;
};

const showBlockFilters = (cb = null, arr) => {
  blockFilters.classList.remove('img-filters--inactive');
  const copyDatasets = arr.slice();

  return (evt) => {
    const arrPictures = document.querySelectorAll('.picture');
    arrButtonsFilter.forEach((button) => button.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    arrPictures.forEach((item) => item.remove());
    switch(evt.target.id) {
      case FILTER_ID.DEFAULT:
        cb(arr);
        break;
      case FILTER_ID.RANDOM:
        cb(createRandomArray(arr));
        break;
      case FILTER_ID.DISCUSSED:
        cb(doesFiltration(copyDatasets));
        break;
    }
  };
};
export {showBlockFilters};
