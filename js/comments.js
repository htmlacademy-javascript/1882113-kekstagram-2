const commentTemplate = document.querySelector('#comment').content;
const commentsShow = document.querySelector('.social__comments');


export const showComment = (itemNumberShow) => {
  for(let i = 0; i <= itemNumberShow - 1; i++) {
    if(commentsShow.children[i]) {
      commentsShow.children[i].classList.remove('hidden');
    } else {
      break;
    }
  }
};


const renderComment = ({avatar, message, name}) => {
  const commentItem = commentTemplate.cloneNode(true);
  const commentListItem = commentItem.querySelector('.social__comment');
  const imageComment = commentItem.querySelector('.social__picture');
  const commentText = commentItem.querySelector('.social__text');
  imageComment.src = avatar;
  imageComment.alt = name;
  commentText.textContent = message;
  commentListItem.classList.add('hidden');

  return commentItem;
};
export {renderComment};
