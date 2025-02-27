import {
  cleansСomments,
  createListComment,
} from './comments.js';

const picture = document.querySelector('.pictures');
const modalPicture = document.querySelector('.big-picture');
const bigPicture = modalPicture.querySelector('.big-picture__img img');
const closeButtonModal = modalPicture.querySelector('.big-picture__cancel');
const modalLikes = modalPicture.querySelector('.likes-count');
const bigPictureCaption = modalPicture.querySelector('.social__caption');

function buttonCloseHandler() {
  modalPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButtonModal.removeEventListener('click', buttonCloseHandler);
  document.removeEventListener('keydown', buttonCloseHandlerKey);
  cleansСomments();
}

function buttonCloseHandlerKey(evt) {
  if(evt.key === 'Escape') {
    buttonCloseHandler();
  }
}

const userOpenModal = () => {
  modalPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButtonModal.addEventListener('click', buttonCloseHandler);
  document.addEventListener('keydown', buttonCloseHandlerKey);
};


const renderFullModalImage = (datasets, currentThumbail) => {
  const curentObject = datasets.find((dataset) => dataset.id === Number(currentThumbail.id));

  bigPicture.src = curentObject.url;
  modalLikes.textContent = curentObject.likes;
  bigPictureCaption.textContent = curentObject.description;

  createListComment(curentObject.comments);

};

const thumbnailClickHandler = (datasets) => {
  picture.addEventListener('click', (evt) => {
    const currentThumbail = evt.target.closest('a.picture');
    if(currentThumbail) {
      evt.preventDefault();
      renderFullModalImage(datasets, currentThumbail);
      userOpenModal();
    }
  });
};

export {thumbnailClickHandler,};
