import { timer } from './modules/timer';
import { modal } from './modules/modal';
import { tabs } from './modules/tabs';
import { cards } from './modules/cards';
import { calc } from './modules/calc';
import { forms } from './modules/forms';
import { slider } from './modules/slider';
document.addEventListener('DOMContentLoaded', () => {
  timer();
  modal('.modal', '[data-modal]');
  tabs();
  cards();
  calc();
  forms();
  slider();
});
