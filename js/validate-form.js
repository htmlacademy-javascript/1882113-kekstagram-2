const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const buttonClose = uploadOverlay.querySelector('.img-upload__cancel');

//
// uploadOverlay.classList.remove('hidden');
//

const buttonCloseHendler = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  buttonClose.removeEventListener('click', buttonCloseHendler);
  uploadFile.value = '';
  console.log(uploadFile.value);
};


uploadFile.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  buttonClose.addEventListener('click', buttonCloseHendler);
});
