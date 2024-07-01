import SortView from '../view/sort-view.js';
import EventList from '../view/event-list-view.js';
import EventView from '../view/event-view.js';
import {render, replace} from '../framework/render.js';
import EditForm from '../view/form-edit-view.js';

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
    const replaceAndRemoveListeners = () => {
      replace(eventView, editForm);
      button.removeEventListener('click', replaceAndRemoveListeners);
      document.removeEventListener('keydown', replaceAndRemoveListeners);
    };

    button.addEventListener('click', replaceAndRemoveListeners, {once: true});
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' || event.code === 'Escape') {
        replaceAndRemoveListeners();
      }
    }, {once: true});
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
    render(new SortView(), this.#container);
    render(this.#events, this.#container);

    this.#pointModel.points.forEach((item) =>
      render(this.#getEventView(item.id, this.#pointModel), this.#events.element));
  }
}
