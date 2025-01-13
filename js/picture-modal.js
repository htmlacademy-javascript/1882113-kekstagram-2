import {
  renderRangeShowComments,
} from './comments.js';

const picture = document.querySelector('.pictures');
const modalPicture = document.querySelector('.big-picture');
const bigPicture = modalPicture.querySelector('.big-picture__img img');
const bigPictureCaption = modalPicture.querySelector('.social__caption');
const modalLikes = modalPicture.querySelector('.likes-count');
const commentsShow = modalPicture.querySelector('.social__comments');
const numberShowComment = modalPicture.querySelector('.social__comment-shown-count');
const totalNumberComment = modalPicture.querySelector('.social__comment-total-count');
const showMoreComment = modalPicture.querySelector('.social__comments-loader');
const closeButtonModal = modalPicture.querySelector('.big-picture__cancel');

let renderShowComents;

function buttonCloseHendler() {
  modalPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsShow.innerHTML = '';
  showMoreComment.classList.remove('hidden');
  showMoreComment.removeEventListener('click', buttonShowMoreHendler);
  closeButtonModal.removeEventListener('click', buttonCloseHendler);
  document.removeEventListener('keydown', buttonCloseHendlerKey);
}

function buttonCloseHendlerKey(evt) {
  if(evt.key === 'Escape') {
    buttonCloseHendler();
  }
}

const hiddenButtonComment = (showComments, totalComments) => {
  if(showComments === totalComments) {
    showMoreComment.classList.add('hidden');
  }
};

function buttonShowMoreHendler(evt) {
  evt.preventDefault();
  renderShowComents(commentsShow);
  numberShowComment.textContent = commentsShow.querySelectorAll('li').length;
  hiddenButtonComment(numberShowComment.textContent, totalNumberComment.textContent);
}


const userOpenMdal = () => {
  modalPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  showMoreComment.addEventListener('click', buttonShowMoreHendler);
  closeButtonModal.addEventListener('click', buttonCloseHendler);
  document.addEventListener('keydown', buttonCloseHendlerKey);
  hiddenButtonComment(numberShowComment.textContent, totalNumberComment.textContent);
};


const renderFullModalImage = (datasets, currentThumbail) => {
  const curentObject = datasets.find((dataset) => dataset.id === Number(currentThumbail.id));

  bigPicture.src = curentObject.url;
  modalLikes.textContent = curentObject.likes;
  totalNumberComment.textContent = curentObject.comments.length;
  bigPictureCaption.textContent = curentObject.description;

  renderShowComents = renderRangeShowComments(curentObject.comments);
  renderShowComents(commentsShow);
  numberShowComment.textContent = commentsShow.querySelectorAll('li').length;
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

export {thumbnailClickHendler};
