import {returnUniqueRandomNumber} from './util.js';

const FILTER_ID = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const FilterConfig = {
  [FILTER_ID.DEFAULT]: returnDefaultArray,
  [FILTER_ID.RANDOM]: createRandomArray,
  [FILTER_ID.DISCUSSED]: doesFiltration,

};

const blockFilters = document.querySelector('.img-filters');
const filterForm = blockFilters.querySelector('.img-filters__form');
const arrButtonsFilter = filterForm.querySelectorAll('button');

function returnDefaultArray (arr) {
  arr.sort((a, b) => {
    if(a.id < b.id) {
      return -1;
    }
  });
  return arr;
}

function doesFiltration(arr) {
  arr.sort((a, b) => {
    if(a.comments.length > b.comments.length) {
      return -1;
    }
  });
  return arr;
}


function createRandomArray(arr) {
  const randomArr = [];
  const randomUniqueNumber = returnUniqueRandomNumber(0, 24);
  for(let i = 0; i < 10; i++) {
    [randomArr[i]] = [arr[randomUniqueNumber()]];
  }
  return randomArr;
}


const showBlockFilters = (cb, arr) => {
  blockFilters.classList.remove('img-filters--inactive');
  const copyDatasets = arr.slice();

  filterForm.addEventListener('click', (evt) => {
    arrButtonsFilter.forEach((button) => button.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    cb(FilterConfig[evt.target.id](copyDatasets));
  });
};
export {showBlockFilters};
