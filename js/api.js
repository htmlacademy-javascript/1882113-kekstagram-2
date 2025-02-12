const templateError = document.querySelector('#data-error').content;
const sendTemplateSuccess = document.querySelector('#success').content;
const sendTemplateError = document.querySelector('#error').content;

const createMessageError = () => {
  const modalError = templateError.cloneNode(true);
  document.body.appendChild(modalError);
  setTimeout(() => {
    const containerError = document.querySelector('.data-error');
    containerError.remove();
  }, 5000);
};


const createInfoModal = (template) => {
  const templateInstanse = template.cloneNode(true);
  document.body.appendChild(templateInstanse);
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


const sendData = (evt) => {
  const formData = new FormData(evt.target);
  fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body: formData,
  })
    .then(() => {
      createInfoModal(sendTemplateSuccess);
    })
    .catch(() => {
      createInfoModal(sendTemplateError);
    });
};


export {
  getData,
  sendData,
};
