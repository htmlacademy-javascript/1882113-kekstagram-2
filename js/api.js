const getData = (renderElement, renderError) => {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then(((response) => response.json()))
    .then((datasets) => {
      renderElement(datasets);
    })
    .catch(() => {
      renderError();
    });
};


const sendData = (body, successModal, errorModal) => fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
  method: 'POST',
  body,
})
  .then((response) => {
    if(response.ok) {
      successModal();
    } else {
      errorModal();
    }
  })
  .catch(() => {
    errorModal();
  });


export {
  getData,
  sendData,
};
