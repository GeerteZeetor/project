import { timer } from './modules/timer';
import { modal } from './modules/modal';
import { tabs } from './modules/tabs';
import { cards } from './modules/cards';
import { slider } from './modules/slider';
import { calc } from './modules/calc';
import { forms } from './modules/forms';
document.addEventListener('DOMContentLoaded', () => {
  timer('.timer', '2023-05-09');
  modal('.modal', '[data-modal]');
  tabs();
  cards();
  calc();
  forms();
  slider({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    prewArrow: '.offer__slider-prev',
    slides: '.offer__slide',
    totalCounter: '#total',
    currentCounter: '#current',
    fild: '.offer__slider-inner',
    wrapprer: '.offer__slider-wrapper',
  });
});
