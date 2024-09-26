import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewEventButtonView from './view/new-event-button-view.js';
import {render} from './framework/render.js';

/**
 * Элемент заголовка сайта
 * @type {HTMLElement}
 */
const siteHeader = document.querySelector('.page-header');

/**
 * Элемент главного блока поездки в заголовке сайта
 * @type {HTMLElement}
 */
const tripMain = siteHeader.querySelector('.trip-main');

/**
 * Элемент блока фильтров в заголовке сайта
 * @type {HTMLElement}
 */
const tripControlsFilters = siteHeader.querySelector('.trip-controls__filters');

/**
 * Элемент главного блока страницы
 * @type {HTMLElement}
 */
const pageMain = document.querySelector('.page-main');

/**
 * Элемент блока событий поездки
 * @type {HTMLElement}
 */
const tripEvents = pageMain.querySelector('.trip-events');

/*
* Модель событий
* @type {EventsModel}
*/
const eventsModel = new EventsModel();

/**
 * Модель фильтров
 * @type {FilterModel}
 */
const filterModel = new FilterModel();

/**
 * Презентер событий
 * @type {EventsPresenter}
 */
const eventsPresenter = new EventsPresenter({
  eventsContainer: tripEvents,
  headerContainer: tripMain,
  eventsModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose,
});

/**
 * Презентер фильтров
 * @type {FilterPresenter}
 */
const filterPresenter = new FilterPresenter({
  filterContainer: tripControlsFilters,
  filterModel,
  eventsModel,
});

/**
 * Компонент кнопки добавления нового события
 * @type {NewEventButtonView}
 */
const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick
});

/**
 * Обработчик закрытия формы добавления нового события
 */
function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

/** Обработчик клика по кнопке добавления нового события */
function handleNewEventButtonClick() {
  eventsPresenter.createEvent();
  newEventButtonComponent.element.disabled = true;
}

/** Рендеринг компонента кнопки добавления нового события */
render(newEventButtonComponent, tripMain);

/** Инициализация презентера фильтров */
filterPresenter.init();

/** Инициализация презентера событий */
eventsPresenter.init();
