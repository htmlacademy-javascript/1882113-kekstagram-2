import{
  renderInfoModal,
  renderMessageError,
  buttonCloseHendler,
} from './upload-modal';

const templateError = document.querySelector('#data-error').content;
const sendTemplateSuccess = document.querySelector('#success').content;
const sendTemplateError = document.querySelector('#error').content;


const getData = (renderThumbnails) => {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then(((response) => response.json()))
    .then((datasets) => {
      renderThumbnails(datasets);
    })
    .catch(() => {
      renderMessageError(templateError);
    });
};


const sendData = (evt) => {
  const formData = new FormData(evt.target);
  fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if(response.ok) {
        renderInfoModal(sendTemplateSuccess);
        buttonCloseHendler();
      } else {
        renderInfoModal(sendTemplateError);
      }
    })
    .catch(() => {
      renderInfoModal(sendTemplateError);
    });
};


export {
  getData,
  sendData,
};
