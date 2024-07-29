import {render} from '../framework/render.js';
import {renderPoints, sortedTime, sortPointsMap} from '../util/sort-util.js';
import {cloneMap} from '../util/common-utils.js';
import {TypeSorted} from '../util/constants-util.js';
import SortView from '../view/sort-view.js';


/**
 * Презентер для сортировки
 * @class SortPresenter
 * @default
 * @export
 */
export default class SortPresenter {
  /** Контейнер элемента */
  #container;
  /** Мапа точек маршрута */
  #pointsMap;
  /** Модель точек назначения */
  #pointsModel;
  /** сортируемая мапа с точками маршрутов */
  #sortedMap;


  /**
   * Конструктор
   *
   * @param container Контейнер элемента
   * @param pointsMap Мапа точек маршрута
   * @param pointsModel Модель точек назначения
   * @constructor
   */
  constructor({container, pointsMap, pointsModel}) {
    this.#container = container;
    this.#pointsMap = pointsMap;
    this.#pointsModel = pointsModel;
    this.#sortedMap = cloneMap(pointsMap);
  }

  /** Обработчик сортировки
   * @private
   * @method handlerSortRoutePoints
   * @return void
   */
  #handlerSortRoutePoints() {
    this.#container.addEventListener('click', this.#onSortRoutePointsClick.bind(this));
  }

  /**
   * Обработчик сортировки на событии
   * @private
   * @method onSortRoutePointsClick
   * @param event событие
   * @return void
   */
  #onSortRoutePointsClick(event) {
    const sortBtn = event.target.closest('.trip-sort__btn');
    if (sortBtn) {
      const sortItem = sortBtn.closest('.trip-sort__item');
      if (sortItem?.dataset?.sort) {
        const sortData = sortItem.dataset.sort;
        const elements = this.#container.querySelector('.trip-events__list');
        switch (sortData) {
          case TypeSorted.DAY:
            renderPoints(this.#pointsMap, elements);
            break;
          case TypeSorted.EVENT:
            sortPointsMap(this.#sortedMap, TypeSorted.TYPE);
            renderPoints(this.#sortedMap, elements);
            break;
          case TypeSorted.TIME:
            sortedTime(this.#sortedMap);
            renderPoints(this.#sortedMap, elements);
            break;
          case TypeSorted.PRICE:
            sortPointsMap(this.#sortedMap, TypeSorted.BASE_PRICE);
            renderPoints(this.#sortedMap, elements);
            break;
          case TypeSorted.OFFER:
            sortPointsMap(this.#sortedMap, TypeSorted.OFFERS);
            renderPoints(this.#sortedMap, elements);
            break;
          default:
            break;
        }
      }
    }
  }

  /**
   * Рендерит сортировку
   * @public
   * @method render
   * @return void
   */
  render() {
    render(new SortView(), this.#container);
    this.#handlerSortRoutePoints();
  }
}
