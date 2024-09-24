import {remove, render, replace} from '../framework/render.js';
import {UpdateTypes, UserActions} from '../constant/constant.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';

/**
 * Перечисление, представляющее различные режимы работы
 *
 * @enum {string}
 */
const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

/** Класс, представляющий презентер для событий */
export default class EventPresenter {

  /**
   * Компонент события
   * @private
   */
  #eventComponent = null;

  /**
   * Компонент редактирования события
   * @private
   */
  #eventEditComponent = null;

  /**
   * Контейнер для списка событий
   * @private
   */
  #eventsListContainer = null;

  /**
   * Текущий режим работы
   *
   * @private
   * @type {Mode}
   */
  #mode = Mode.DEFAULT;

  /**
   * Текущее событие
   * @private
   */
  #event = null;

  /**
   * Список предложений
   * @private
   */
  #offers = [];

  /**
   * Список направлений
   * @private
   */
  #destinations = [];

  /**
   * Обработчик изменения данных
   * @private
   */
  #handleDataChange = null;

  /**
   * Обработчик изменения режима
   * @private
   */
  #handleModeChange = null;


  /**
   * Конструктор класса.
   *
   * @param eventsListContainer Контейнер для списка событий
   * @param offers Список предложений
   * @param destinations Список направлений
   * @param onDataChange Обработчик изменения данных
   * @param onModeChange Обработчик изменения режима
   */
  constructor({eventsListContainer, offers, destinations, onDataChange, onModeChange}) {
    this.#eventsListContainer = eventsListContainer;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }


  /** Инициализирует презентер */
  init(event) {
    this.#event = event;

    const previousEventComponent = this.#eventComponent;
    const previousEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      offers: this.#offers,
      destinations: this.#destinations,
      onRollupClick: this.#handleRollupClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#eventEditComponent = new EventEditView({
      event: this.#event,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteBtnClick: this.#handleDeleteBtnClick,
      onFormRollupClick: this.#handleFormRollupClick,
    });

    if (previousEventComponent === null || previousEventEditComponent === null) {
      render(this.#eventComponent, this.#eventsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, previousEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventEditComponent, previousEventEditComponent);
    }

    remove(previousEventComponent);
    remove(previousEventEditComponent);
  }

  /** Удаляет компоненты события и редактирования */
  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  /** Сбрасывает представление события */
  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#eventEditComponent.reset(this.#event);
      this.#replaceFormToEvent();
    }
  }

  /**
   * Заменяет компонент события компонентом редактирования
   * @private
   */
  #replaceEventToForm() {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  /**
   * Заменяет компонент редактирования компонентом события
   * @private
   */
  #replaceFormToEvent() {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  /**
   * Обработчик события нажатия на клавишу Escape
   *
   * @private
   * @param {KeyboardEvent} evt Событие нажатия на клавишу
   */
  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#eventEditComponent.reset(this.#event);
      this.#replaceFormToEvent();
    }
  };

  /**
   * Обработчик события нажатия на кнопку "Свернуть"
   * @private
   */
  #handleRollupClick = () => {
    this.#replaceEventToForm();
  };

  /**
   * Обработчик события нажатия на кнопку "Избранное"
   * @private
   */
  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserActions.UPDATE_EVENT,
      UpdateTypes.PATCH,
      {...this.#event, isFavorite: !this.#event.isFavorite},
    );
  };

  /**
   * Обработчик события отправки формы.
   *
   * @private
   * @param {Event} event Событие отправки формы.
   */
  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserActions.UPDATE_EVENT,
      UpdateTypes.MINOR,
      event,
    );
    this.#replaceFormToEvent();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  /**
   * Обработчик события нажатия на кнопку "Удалить"
   *
   * @private
   * @param {Event} event Событие нажатия на кнопку
   */
  #handleDeleteBtnClick = (event) => {
    this.#handleDataChange(
      UserActions.DELETE_EVENT,
      UpdateTypes.MINOR,
      event,
    );
  };

  /**
   * Обработчик события нажатия на кнопку "Свернуть" в форме
   * @private
   */
  #handleFormRollupClick = () => {
    this.#eventEditComponent.reset(this.#event);
    this.#replaceFormToEvent();
  };
}
