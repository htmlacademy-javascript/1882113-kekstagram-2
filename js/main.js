import './api.js';
// import './create-foto-data.js';
import './miniature.js';
import './picture-modal.js';
import './upload-modal.js';
import './validate-form.js';
import './resize-img.js';
import './slider.js';
import './filter-miniature.js';
import {addedThumbnails} from './miniature.js';
import {renderMessageError} from './upload-modal.js';
import { getData } from './api.js';

getData()
  .then((dataset) => {
    addedThumbnails(dataset);
  })
  .catch(() => {
    renderMessageError();
  });
