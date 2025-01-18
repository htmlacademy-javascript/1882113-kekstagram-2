const commentTemplate = document.querySelector('#comment').content;
const modalPicture = document.querySelector('.big-picture');
const commentsShow = modalPicture.querySelector('.social__comments');
const loaderMoreComments = modalPicture.querySelector('.social__comments-loader');
const modalLikes = modalPicture.querySelector('.likes-count');
const totalNumberComment = modalPicture.querySelector('.social__comment-total-count');
const bigPictureCaption = modalPicture.querySelector('.social__caption');
const numberShowComment = modalPicture.querySelector('.social__comment-shown-count');

const createComment = ({avatar, message, name}) => {
  const commentItem = commentTemplate.cloneNode(true);
  const imageComment = commentItem.querySelector('.social__picture');
  const commentText = commentItem.querySelector('.social__text');
  imageComment.src = avatar;
  imageComment.alt = name;
  commentText.textContent = message;

  return commentItem;
};

const renderComments = (datasets) => {
  const fragment = document.createDocumentFragment();
  datasets.forEach((dataset) => {
    fragment.appendChild(createComment(dataset));
  });
  return fragment;
};

const addedCommentsShowHandler = (hendler) => {
  if(totalNumberComment.textContent > 5) {
    loaderMoreComments.addEventListener('click', hendler);
  }
};

const cleansСomments = (hendler) => {
  loaderMoreComments.removeEventListener('click', hendler);
  loaderMoreComments.classList.remove('hidden');
  commentsShow.innerHTML = '';
};

const initComment = (datasets) => {
  let startNumberComments = 0;
  const stepNumberComments = 5;
  modalLikes.textContent = datasets.likes;
  totalNumberComment.textContent = datasets.comments.length;
  bigPictureCaption.textContent = datasets.description;

  return () => {
    const steckComment = datasets.comments.slice(startNumberComments, startNumberComments + stepNumberComments);
    commentsShow.appendChild(renderComments(steckComment));
    numberShowComment.textContent = commentsShow.querySelectorAll('li').length;
    startNumberComments += 5;
    if(numberShowComment.textContent === totalNumberComment.textContent) {
      loaderMoreComments.classList.add('hidden');
    }
  };
};


export {
  initComment,
  addedCommentsShowHandler,
  cleansСomments,
};
