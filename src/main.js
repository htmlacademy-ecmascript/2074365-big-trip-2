import AppPresenter from './presenter/app-presenter.js';
import PointsModel from './model/points-model.js';

const tripMain = document.querySelector('.trip-main');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');

new AppPresenter({
  tripEvents: tripEvents,
  tripMain: tripMain,
  tripFilters: tripFilters,
  pointsModel: new PointsModel()
}).init();
