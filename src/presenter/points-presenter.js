import {render, replace} from '../framework/render.js';
import {StatusEvent, TypeEvent} from '../util/constants-util.js';
import PointView from '../view/point-view.js';
import EditFormView from '../view/form-edit-view.js';
import PointsView from '../view/points-view.js';


/**
 * Презентер точек
 * @class PointsPresenter
 * @default
 * @export
 */
export default class PointsPresenter {
  /** Контейнер элемента */
  #container;
  /** Модель точек назначения */
  #pointsModel;
  /** Мапа точек маршрута */
  #pointsMap = new Map();


  /**
   * Конструктор
   *
   * @param container Контейнер элемента
   * @param pointsModel Модель точек назначения
   * @constructor
   */
  constructor({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  /** Добавляет точки маршрута в мапу */
  get pointsMap() {
    if (this.#pointsModel?.points?.length > 0) {
      this.#pointsModel.points.forEach((point) => {
        const eventView = this.#getEventView(point.id, point, this.#pointsModel);
        this.#pointsMap.set(point.id, eventView);
      });
    }
    return this.#pointsMap;
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

  /**
   * Обработчик отправки формы
   * @private
   * @method onFormSubmitClick
   * @return void
   * @param event событие на элементе формы
   */
  #onFormSubmitClick(event) {
    event.preventDefault();
  }

  /**
   * Обработчик смены транспорта
   * @private
   * @method onFormChangOfDestinationClick
   * @return void
   */
  #onFormChangOfDestinationClick(state, editForm, event) {
    if (event?.target?.closest('.event__type-item')) {
      const type = event.target.closest('.event__type-item');
      if (type?.dataset?.type) {
        state.type = type.dataset.type;
        editForm.updateElement(state);
      }
    }
  }

  /**
   * Обработчик смены пункта назначения
   * @private
   * @method onFormInputOfDestinationClick
   * @return void
   */
  #onFormInputOfDestinationClick(state, editForm, event) {
    const optionValue = event?.target?.value;
    if (!optionValue) {
      return;
    }

    const destinationList = document.querySelector('#destination-list-2');
    const selectedOption = Array.from(destinationList.querySelectorAll('option')).find(
      (option) => option.value === optionValue
    );

    if (selectedOption?.dataset?.id) {
      state.destination = selectedOption.dataset.id;
      editForm.updateElement(state);
    }
  }

  /**
   * Получить экземпляр точки маршрута
   * @public
   * @method getEventView
   * @param id идентификатор
   * @param point точка
   * @param pointsModel модель точек назначения
   * @return {PointView}
   */
  #getEventView(id, point, pointsModel) {
    const pointView = new PointView({
      id: id,
      point: point,
      pointsModel: pointsModel,
    });

    pointView.editForm = new EditFormView({
      id: id,
      pointsModel: pointsModel,
      onFormSubmitClick: this.#onFormSubmitClick,
      onFormChangOfDestinationClick: this.#onFormChangOfDestinationClick,
      onFormInputOfDestinationClick: this.#onFormInputOfDestinationClick
    });
    return pointView;
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
    document.addEventListener('keydown', this.onReferenceToHandlerClick);
    return this.onReferenceToHandlerClick;
  }

  /**
   * Обработчик события меняет форму редактирования на точку маршрута
   * @private
   * @method onEscKeyEditFormClose
   * @param pointView экземпляр точки маршрута
   * @param event событие
   * @return void
   */
  #onEscKeyEditFormClose(pointView, event) {
    if (event?.key && event.key === 'Escape') {
      this.#replaceEditFormViewToPointView(pointView);
      document.removeEventListener('keydown', this.onReferenceToHandlerClick);
    }
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
        eventViewItem.editForm.reset(eventViewItem);
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
      pointView.editForm.reset(pointView);
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
}
