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

function returnDefaultArray (datasetsArray) {
  datasetsArray.sort((a, b) => {
    if(a.id < b.id) {
      return -1;
    }
  });
  return datasetsArray;
}

function doesFiltration(datasetsArray) {
  datasetsArray.sort((a, b) => {
    if(a.comments.length > b.comments.length) {
      return -1;
    }
  });
  return datasetsArray;
}


function createRandomArray(datasetsArray) {
  const randomDatasetsArray = [];
  const randomUniqueNumber = returnUniqueRandomNumber(0, 24);
  for(let i = 0; i < 10; i++) {
    [randomDatasetsArray[i]] = [datasetsArray[randomUniqueNumber()]];
  }
  return randomDatasetsArray;
}


const showBlockFilters = (cb, datasetsArray) => {
  blockFilters.classList.remove('img-filters--inactive');
  const copyDatasets = datasetsArray.slice();

  filterForm.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('img-filters__button--active')) {
      return;
    }
    arrButtonsFilter.forEach((button) => button.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    cb(FilterConfig[evt.target.id](copyDatasets));
  });
};
export {showBlockFilters};
