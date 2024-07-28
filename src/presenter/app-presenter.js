import {render} from '../framework/render.js';
import {renderPoints, sortPointsMap} from '../util/sort-util.js';
import {TypeSorted} from '../util/constants-util.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import InfoPresenter from './info-presenter.js';
import FilterPresenter from './filter-presenter.js';
import SortPresenter from './sort-presenter.js';
import PointsPresenter from './points-presenter.js';


/**
 * Главный презентер приложения
 * Отвечает за управление состоянием и логикой приложения в целом
 * @class AppPresenter
 * @default
 * @export
 */
export default class AppPresenter {

  /** Контейнер элемента */
  #tripEvents;
  /** Блок точки маршрута */
  #tripMain;
  /** Блок фильтра */
  #tripFilters;
  /** Модель точек назначения */
  #pointsModel;

  /** Мапа точек маршрута */
  #pointsMap = new Map();

  /**
   * Конструктор
   *
   * @param tripEvents Элемент события
   * @param tripMain Блок точки маршрута
   * @param tripFilters Блок фильтра
   * @param pointsModel Модель точек назначения
   * @constructor
   */
  constructor({tripEvents, tripMain, tripFilters, pointsModel}) {
    this.#tripEvents = tripEvents;
    this.#tripMain = tripMain;
    this.#tripFilters = tripFilters;
    this.#pointsModel = pointsModel;
  }

  /**
   * Метод для обработки события инициализации приложения
   *
   * @public
   * @method init
   * @return void
   */
  init() {
    this.#addPointsToMap();
    this.#renderTripInfo();
    this.#renderFilter();
    this.#renderSort();
    this.#renderTripEvent();
  }

  /** Добавляет точки маршрута в мапу */
  #addPointsToMap() {
    const pointPresenter = new PointPresenter();
    if (this.#pointsModel?.points?.length > 0) {
      this.#pointsModel.points.forEach((point) => {
        const eventView = pointPresenter.getEventView(point.id, point, this.#pointsModel);
        this.#pointsMap.set(point.id, eventView);
      });
    }
  }

  /**
   * Рендерит информацию о поездке
   * @private
   * @method renderTripInfo
   * @return void
   */
  #renderTripInfo() {
    new InfoPresenter({container: this.#tripMain}).render();
  }

  /**
   * Рендерит фильтр.
   * @private
   * @method renderFilter
   * @return void
   */
  #renderFilter() {
    new FilterPresenter({container: this.#tripFilters}).render();
  }

  /**
   * Рендерит сортировку
   * @private
   * @method renderSort
   * @return void
   */
  #renderSort() {
    new SortPresenter({
      container: this.#tripEvents,
      pointsMap: this.#pointsMap,
      pointsModel: this.#pointsModel
    }).render();
  }

  /**
   * Получить блок для точек маршрутов
   * @private
   * @method getPointsView
   * @return {PointsView}
   */
  #getPointsView() {
    return new PointsPresenter({container: this.#tripEvents, pointsMap: this.#pointsMap}).pointsView;
  }

  /**
   * Рендерит точки маршрута
   * @private
   * @method renderTripEvent
   * @return void
   */
  #renderTripEvent() {
    const pointsElement = this.#getPointsView().element;
    const points = this.#pointsMap;
    if (points.size === 0) {
      render(new NoPointView(), pointsElement);
      return;
    }
    sortPointsMap(this.#pointsMap, TypeSorted.DATE_FORM);
    renderPoints(this.#pointsMap, pointsElement);
  }
}
