import {
  initComment,
  addedCommentsShowHandler,
  cleansСomments,
} from './comments.js';

const picture = document.querySelector('.pictures');
const modalPicture = document.querySelector('.big-picture');
const bigPicture = modalPicture.querySelector('.big-picture__img img');
const closeButtonModal = modalPicture.querySelector('.big-picture__cancel');

let renderShowComents;

function buttonCloseHendler() {
  modalPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButtonModal.removeEventListener('click', buttonCloseHendler);
  document.removeEventListener('keydown', buttonCloseHendlerKey);
  cleansСomments(renderShowComents);
}

function buttonCloseHendlerKey(evt) {
  if(evt.key === 'Escape') {
    buttonCloseHendler();
  }
}

const userOpenMdal = () => {
  modalPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButtonModal.addEventListener('click', buttonCloseHendler);
  document.addEventListener('keydown', buttonCloseHendlerKey);
  addedCommentsShowHandler(renderShowComents);
};


const renderFullModalImage = (datasets, currentThumbail) => {
  const curentObject = datasets.find((dataset) => dataset.id === Number(currentThumbail.id));

  bigPicture.src = curentObject.url;

  renderShowComents = initComment(curentObject);
  renderShowComents();
};

const thumbnailClickHendler = (datasets) => {
  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    const currentThumbail = evt.target.closest('a.picture');
    if(currentThumbail) {
      renderFullModalImage(datasets, currentThumbail);
      userOpenMdal();
    }
  });
};

export {thumbnailClickHendler,};
