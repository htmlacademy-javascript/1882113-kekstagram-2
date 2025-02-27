const COMMENT_SETING = {
  START_NUMBER: 0,
  STEP_NUMBER: 5,
};

const commentTemplate = document.querySelector('#comment').content;
const modalPicture = document.querySelector('.big-picture');
const commentsShow = modalPicture.querySelector('.social__comments');
const loaderMoreComments = modalPicture.querySelector('.social__comments-loader');
const totalNumberComment = modalPicture.querySelector('.social__comment-total-count');
const numberShowComment = modalPicture.querySelector('.social__comment-shown-count');
let renderShowComents;

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

const cleansСomments = () => {
  loaderMoreComments.removeEventListener('click', renderShowComents);
  loaderMoreComments.classList.remove('hidden');
  commentsShow.innerHTML = '';
};


const initComment = () => {
  let startNumberComments = COMMENT_SETING.START_NUMBER;
  const stepNumberComments = COMMENT_SETING.STEP_NUMBER;
  let arreyComments;
  return (datasets) => {
    if(!arreyComments) {
      arreyComments = datasets;
    }
    totalNumberComment.textContent = arreyComments.length;
    const steckComment = arreyComments.slice(startNumberComments, startNumberComments + stepNumberComments);
    commentsShow.appendChild(renderComments(steckComment));
    numberShowComment.textContent = commentsShow.querySelectorAll('li').length;
    startNumberComments += COMMENT_SETING.STEP_NUMBER;
    if(commentsShow.querySelectorAll('li').length === arreyComments.length) {
      loaderMoreComments.classList.add('hidden');
    }
  };
};


const createListComment = (datasets) => {
  renderShowComents = initComment();
  renderShowComents(datasets);
  if(datasets.length > COMMENT_SETING.STEP_NUMBER) {
    loaderMoreComments.addEventListener('click', renderShowComents);
  }
};

export {
  cleansСomments,
  createListComment,
};
