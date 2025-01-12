import './create-foto-data.js';
import './miniature.js';
import './full-picture-modal';
import {renderThumbnails} from './miniature.js';
import {createPhotoData } from './create-foto-data.js';
renderThumbnails(createPhotoData());
