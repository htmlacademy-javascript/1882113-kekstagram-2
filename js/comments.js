const renderComment = ({avatar, message, name}) => {
  const listItem = document.createElement('li');
  listItem.classList.add('social__comment');
  const commentImage = document.createElement('img');
  const commentText = document.createElement('p');
  commentImage.classList.add('social__picture');
  commentImage.src = avatar;
  commentImage.alt = name;
  commentText.classList.add('social__text');
  commentText.textContent = message;
  listItem.appendChild(commentImage);
  listItem.appendChild(commentText);
  listItem.classList.add('hidden');

  return listItem;
};
export {renderComment};
