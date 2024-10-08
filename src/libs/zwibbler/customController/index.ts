import { MainScope } from '@/libs/zwibbler/zwibbler-def';

import zoomController from './zoomController';
import selectionController from './selectionController';
import audioController from './audioController';
import canvasController from './canvasController';
import linkController from './linkController';
import stickyController from './stickyController';
import speakController from './speakController';

export default function customController(scope: MainScope) {
  // variables
  scope.isTextEditMode = false;

  // selection
  selectionController(scope);

  // recorder
  audioController(scope);

  // formatted scale
  zoomController(scope);

  // canvas variable
  canvasController(scope);

  // link button
  linkController(scope);

  // sticky button
  stickyController(scope);

  speakController(scope);
}
