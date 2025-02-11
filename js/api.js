const templateError = document.querySelector('#data-error').content;

const createMessageError = () => {
  const modalError = templateError.cloneNode(true);
  document.body.appendChild(modalError);
  setTimeout(() => {
    const containerError = document.querySelector('.data-error');
    containerError.remove();
  }, 5000);
};

const getData = (renderThumbnails) => {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then(((response) => response.json()))
    .then((datasets) => {
      renderThumbnails(datasets);
    })
    .catch(() => {
      createMessageError();
    });
};


export {getData};
