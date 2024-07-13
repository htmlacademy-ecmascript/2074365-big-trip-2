import PointsView from '../view/points-view.js';
import {render, replace} from '../framework/render.js';
import {StatusEvent, TypeEvent} from '../util/common.js';

/**
 * Презентер точек
 * @class PointsPresenter
 * @default
 * @export
 */
export default class PointsPresenter {
  /** Контейнер элемента */
  #container;
  /** Мапа точек маршрута */
  #pointsMap;

  /**
   * Конструктор
   *
   * @param container Контейнер элемента
   * @param pointsMap Мапа точек маршрута
   * @constructor
   */
  constructor({container, pointsMap}) {
    this.#container = container;
    this.#pointsMap = pointsMap;
  }

  /**
   * Обработчик формы редактирования
   * @private
   * @method onEditFormClick
   * @param event событие
   * @return void
   */
  #onEditFormClick(event) {
    const target = event.target;
    const itemElement = target.closest('.trip-events__item');
    if (itemElement && target.classList.contains('event__rollup-btn')) {
      const {id: itemId, typeEvent} = itemElement.dataset;
      const pointView = this.#pointsMap.get(itemId);
      if (TypeEvent.POINT === typeEvent) {
        const isCloseEditForms = this.#isCloseActiveEditForms();
        this.onEscKeyEditFormClose = this.#handlerKeydownEscToEditForm(pointView, isCloseEditForms);
        this.#replacePointViewToEditFormView(pointView);
      } else if (TypeEvent.EDIT === typeEvent) {
        this.#replaceEditFormViewToPointView(pointView);
        document.removeEventListener('keydown', this.onEscKeyEditFormClose);
      }
    }
  }

  /**
   * Обработчик закрытия формы редактирования по ESC
   * @private
   * @method onEscKeyEditFormClose
   * @param pointView экземпляр точки маршрута
   * @param isCloseEditForms значение былы ли закрыты формы редактирования перед открытием новой формы редактирования
   * @return onReferenceToHandlerClick
   */
  #handlerKeydownEscToEditForm(pointView, isCloseEditForms) {
    if (isCloseEditForms) {
      document.removeEventListener('keydown', this.onReferenceToHandlerClick);
    }
    this.onReferenceToHandlerClick = this.#onEscKeyEditFormClose.bind(this, pointView);
    document.addEventListener('keydown', this.onReferenceToHandlerClick, {once: true});
    return this.onReferenceToHandlerClick;
  }

  /**
   * Обработчик события меняет форму редактирования на точку маршрута
   * @private
   * @method onEscKeyEditFormClose
   * @param pointView экземпляр точки маршрута
   * @return void
   */
  #onEscKeyEditFormClose(pointView) {
    this.#replaceEditFormViewToPointView(pointView);
  }

  /**
   * Закрывает все открытые формы редактирования маршрутов и возвращяет булеан результат работы
   * @private
   * @method isCloseActiveEditForms
   * @return {Boolean}
   */
  #isCloseActiveEditForms() {
    let isCloseEdits = false;
    this.#pointsMap.forEach((eventViewItem) => {
      const {status: pointStatus} = eventViewItem.element.dataset;
      if (StatusEvent.EDIT === pointStatus) {
        isCloseEdits = true;
        eventViewItem.element.dataset.status = StatusEvent.DEFAULT;
        replace(eventViewItem, eventViewItem.editForm);
      }
    });
    return isCloseEdits;
  }

  /**
   * Заменяет точку маршрута на форму редактирования
   * @private
   * @method replacePointViewToEditFormView
   * @param pointView экземпляр точки маршрута
   */
  #replacePointViewToEditFormView(pointView) {
    if (pointView) {
      pointView.element.dataset.status = StatusEvent.EDIT;
      replace(pointView.editForm, pointView);
    }
  }

  /**
   * Заменяет форму редактирования на точку маршрута
   * @private
   * @method replaceEditFormViewToEventView
   * @param pointView экземпляр точки маршрута
   */
  #replaceEditFormViewToPointView(pointView) {
    if (pointView) {
      pointView.element.dataset.status = StatusEvent.DEFAULT;
      replace(pointView, pointView.editForm);
    }
  }

  /**
   * Обработчик события выбора в избранные
   * @private
   * @method onSelectFavoriteClick
   * @param event событие
   * @param element элемент на котором находится событие
   * @param onHandlerFavoriteClick ссылка на обработчик событий
   * @return void
   */
  #onSelectFavoriteClick(event, element, onHandlerFavoriteClick) {
    if (this.#pointsMap?.size === 0) {
      element.removeEventListener('click', onHandlerFavoriteClick);
      return;
    }

    const button = event.target.closest('.event__favorite-btn');
    if (!button) {
      return;
    }

    const item = button.closest('.trip-events__item');
    if (!item) {
      return;
    }

    const itemId = item.dataset.id;
    const point = this.#pointsMap.get(itemId);
    if (point) {
      point.point.isFavorite = !point.point.isFavorite;
      button.classList.toggle('event__favorite-btn--active');
      item.replaceWith(point.element);
    }
  }

  /** Рендерит блок для точек маршрутов */
  #render(pointsView) {
    render(pointsView, this.#container);
  }

  /**
   * Получить представления точек маршрута
   * @public
   * @method pointsView
   * @return {PointsView}
   */
  get pointsView() {
    const pointsView = new PointsView({
      onSelectFavoriteClick: this.#onSelectFavoriteClick.bind(this),
      onEditFormClick: this.#onEditFormClick.bind(this)
    });
    this.#render(pointsView);
    return pointsView;
  }
}
