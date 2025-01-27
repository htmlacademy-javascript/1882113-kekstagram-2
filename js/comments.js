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

const initComment = () => {
  let startNumberComments = 0;
  const stepNumberComments = 5;
  let arreyComments;
  return (datasets) => {
    if(!arreyComments) {
      arreyComments = datasets;
    }
    totalNumberComment.textContent = arreyComments.length;
    const steckComment = arreyComments.slice(startNumberComments, startNumberComments + stepNumberComments);
    commentsShow.appendChild(renderComments(steckComment));
    numberShowComment.textContent = commentsShow.querySelectorAll('li').length;
    startNumberComments += 5;
    if(numberShowComment.textContent === totalNumberComment.textContent) {
      loaderMoreComments.classList.add('hidden');
    }
  };
};
const createListComment = (datasets) => {
  renderShowComents = initComment();
  renderShowComents(datasets);
};


export {
  initComment,
  addedCommentsShowHandler,
  cleansСomments,
  renderShowComents,
  createListComment,
};
