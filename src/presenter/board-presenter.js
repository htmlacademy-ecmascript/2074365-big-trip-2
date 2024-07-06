import EventList from '../view/event-list-view.js';
import EventView from '../view/event-view.js';
import {render, replace} from '../framework/render.js';
import EditForm from '../view/form-edit-view.js';
import NoEventView from '../view/no-event-view.js';

/** Презентер для отрисовки */
export default class BoardPresenter {

  /** Контейнер элемента */
  #container;

  /** Модель точки назначения */
  #pointModel;

  /** Список событий */
  #events = new EventList();

  /**
   * Конструктор
   * @param container Контейнер элемента
   * @param pointModel Модель точки назначения
   */
  constructor({container, pointModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  /** Инициализирует приложение */
  init() {
    this.#renderApp();
  }

  /**
   * Обработчик формы редактирования
   * @param editForm экземпляр редактирования формы
   * @param eventView экземпляр точки назначения
   */
  #onEditFormClick(editForm, eventView) {
    replace(editForm, eventView);
    const button = editForm.element.querySelector('.event__rollup-btn');
    const onReplaceAndRemoveListenersClick = () => {
      replace(eventView, editForm);
      button.removeEventListener('click', onReplaceAndRemoveListenersClick);
      document.removeEventListener('keydown', onReplaceAndRemoveListenersClick);
    };
    button.addEventListener('click', onReplaceAndRemoveListenersClick);
    document.addEventListener('keydown', onReplaceAndRemoveListenersClick);
  }

  /**
   * Обработчик отправки формы
   * @param event событие на элементе формы
   */
  #onFormSubmitClick(event) {
    event.preventDefault();
  }

  /**
   * Получить экземпляр события
   * @param id идентификатор
   * @param pointModel модель точки
   * @return {EventView}
   */
  #getEventView(id, pointModel) {
    const editForm = new EditForm({
      id: id, pointModel: pointModel, onFormSubmitClick: this.#onFormSubmitClick
    });
    return new EventView({
      id: id, pointModel: pointModel, editForm: editForm, onEditFormClick: this.#onEditFormClick
    });
  }

  /** Рендерит приложение */
  #renderApp() {
    render(this.#events, this.#container);

    if (this.#pointModel.points.length > 0) {
      this.#pointModel.points.forEach((item) =>
        render(this.#getEventView(item.id, this.#pointModel), this.#events.element));
    } else {
      render(new NoEventView(), this.#events.element);
    }
  }
}
