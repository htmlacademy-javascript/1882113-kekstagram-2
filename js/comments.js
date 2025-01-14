const commentTemplate = document.querySelector('#comment').content;

const renderComment = ({avatar, message, name}) => {
  const commentItem = commentTemplate.cloneNode(true);
  const imageComment = commentItem.querySelector('.social__picture');
  const commentText = commentItem.querySelector('.social__text');
  imageComment.src = avatar;
  imageComment.alt = name;
  commentText.textContent = message;

  return commentItem;
};

const renderRangeShowComments = (datasets, startNumberComments = 0, stepNumberComments = 5) => (commentContainer) => {
  const fragment = document.createDocumentFragment();
  const showComments = datasets.slice(startNumberComments, startNumberComments + stepNumberComments);
  startNumberComments += 5;
  showComments.forEach((showComment) => {
    fragment.appendChild(renderComment(showComment));
  });
  commentContainer.appendChild(fragment);
};

export {renderRangeShowComments};
