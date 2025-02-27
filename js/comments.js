const COMMENT_SETTING = {
  START_NUMBER: 0,
  STEP_NUMBER: 5,
};

const commentTemplate = document.querySelector('#comment').content;
const modalPicture = document.querySelector('.big-picture');
const commentsShow = modalPicture.querySelector('.social__comments');
const loaderMoreComments = modalPicture.querySelector('.social__comments-loader');
const totalNumberComment = modalPicture.querySelector('.social__comment-total-count');
const numberShowComment = modalPicture.querySelector('.social__comment-shown-count');
let renderShowComments;

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
  loaderMoreComments.removeEventListener('click', renderShowComments);
  loaderMoreComments.classList.remove('hidden');
  commentsShow.innerHTML = '';
};


const initComment = () => {
  let startNumberComments = COMMENT_SETTING.START_NUMBER;
  const stepNumberComments = COMMENT_SETTING.STEP_NUMBER;
  let arrayComments;
  return (datasets) => {
    if(!arrayComments) {
      arrayComments = datasets;
    }
    totalNumberComment.textContent = arrayComments.length;
    const stackComment = arrayComments.slice(startNumberComments, startNumberComments + stepNumberComments);
    commentsShow.appendChild(renderComments(stackComment));
    numberShowComment.textContent = commentsShow.querySelectorAll('li').length;
    startNumberComments += COMMENT_SETTING.STEP_NUMBER;
    if(commentsShow.querySelectorAll('li').length === arrayComments.length) {
      loaderMoreComments.classList.add('hidden');
    }
  };
};


const createListComment = (datasets) => {
  renderShowComments = initComment();
  renderShowComments(datasets);
  if(datasets.length > COMMENT_SETTING.STEP_NUMBER) {
    loaderMoreComments.addEventListener('click', renderShowComments);
  }
};

export {
  cleansСomments,
  createListComment,
};
