import {
  addedCommentsShowHandler,
  cleansСomments,
  renderShowComents,
  createListComment,
} from './comments.js';

const picture = document.querySelector('.pictures');
const modalPicture = document.querySelector('.big-picture');
const bigPicture = modalPicture.querySelector('.big-picture__img img');
const closeButtonModal = modalPicture.querySelector('.big-picture__cancel');
const modalLikes = modalPicture.querySelector('.likes-count');
const bigPictureCaption = modalPicture.querySelector('.social__caption');

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
  modalLikes.textContent = curentObject.likes;
  bigPictureCaption.textContent = curentObject.description;

  createListComment(curentObject.comments);
};

const thumbnailClickHendler = (datasets) => {
  picture.addEventListener('click', (evt) => {
    const currentThumbail = evt.target.closest('a.picture');
    if(currentThumbail) {
      evt.preventDefault();
      renderFullModalImage(datasets, currentThumbail);
      userOpenMdal();
    }
  });
};

export {thumbnailClickHendler,};
