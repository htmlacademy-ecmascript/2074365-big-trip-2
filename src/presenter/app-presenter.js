import {render} from '../framework/render.js';
import {renderPoints, sortPointsMap} from '../util/sort-util.js';
import {TypeSorted} from '../util/constants-util.js';
import NoPointView from '../view/no-point-view.js';
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
    const pointsView = this.#getPointsView();
    this.#renderTripInfo();
    this.#renderFilter();
    this.#renderSort(pointsView);
    this.#renderTripEvent(pointsView);
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
   * @param pointsView Экземпляр точки маршрута
   * @return void
   */
  #renderSort(pointsView) {
    const pointsMap = pointsView.pointsMap;
    new SortPresenter({
      container: this.#tripEvents,
      pointsMap: pointsMap,
      pointsModel: this.#pointsModel
    }).render();
  }

  /**
   * Получить блок для точек маршрутов
   * @private
   * @method getPointsView
   * @return {PointsPresenter}
   */
  #getPointsView() {
    return new PointsPresenter({container: this.#tripEvents, pointsModel: this.#pointsModel});
  }

  /**
   * Рендерит точки маршрута
   * @private
   * @method renderTripEvent
   * @param pointsView Экземпляр точки маршрута
   * @return void
   */
  #renderTripEvent(pointsView) {
    const pointsElement = pointsView.pointsView.element;
    const pointsMap = pointsView.pointsMap;
    if (pointsMap.size === 0) {
      render(new NoPointView(), pointsElement);
      return;
    }
    sortPointsMap(pointsMap, TypeSorted.DATE_FORM);
    renderPoints(pointsMap, pointsElement);
  }
}
