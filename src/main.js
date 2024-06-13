import InfoTrip from './view/info-trip-view.js';
import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import {render, RenderPosition} from './render.js';

const tripMain = document.querySelector('.trip-main');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');

const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');

render(new InfoTrip(), tripMain, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripControlsFilters);

const presenter = new BoardPresenter({container: tripEvents});
presenter.init();
