import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/points-model.js';
import SortPresenter from './presenter/sort-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import InfoTripPresenter from './presenter/info-trip-presenter.js';

const tripMain = document.querySelector('.trip-main');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');

new InfoTripPresenter({container: tripMain}).init();
new FilterPresenter({container: tripControlsFilters}).init();
new SortPresenter({container: tripEvents}).init();
new BoardPresenter({container: tripEvents, pointModel: new PointModel()}).init();
