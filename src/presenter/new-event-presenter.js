import {remove, render, RenderPosition} from '../framework/render.js';
import EventAddView from '../view/event-add-view.js';
import {UpdateTypes, UserActions} from '../constant/constant.js';
import {getRandomNumber} from '../util/common';

/** Презентер для создания нового события */
export default class NewEventPresenter {

  /**
   * Контейнер для списка событий
   * @private
   */
  #eventListContainer = null;

  /**
   * Список предложений
   * @private
   */
  #offers = null;

  /**
   * Список направлений
   * @private
   */
  #destinations = null;

  /**
   * Обработчик изменения данных
   * @private
   */
  #handleDataChange = null;

  /**
   * Обработчик уничтожения презентера
   * @private
   */
  #handleDestroy = null;

  /**
   * Компонент для добавления нового события
   * @private
   */
  #eventAddComponent = null;

  /**
   * Конструктор презентера создания нового события
   * @param eventListContainer Контейнер для списка событий
   * @param offers Список предложений
   * @param destinations Список направлений
   * @param onDataChange Обработчик изменения данных
   * @param onDestroy Обработчик уничтожения презентера
   */
  constructor({eventListContainer, offers, destinations, onDataChange, onDestroy}) {
    this.#eventListContainer = eventListContainer;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  /** Инициализирует презентер */
  init() {
    if (this.#eventAddComponent !== null) {
      return;
    }

    this.#eventAddComponent = new EventAddView({
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteBtnClick: this.#handleDeleteClick,
    });

    render(this.#eventAddComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  /** Уничтожает презентер */
  destroy() {
    if (this.#eventAddComponent === null) {
      return;
    }

    this.#handleDestroy();
    remove(this.#eventAddComponent);
    this.#eventAddComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  /**
   * Обработчик сохранения формы добавления события
   * @param event Данные из формы
   * @private
   */
  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserActions.ADD_EVENT,
      UpdateTypes.MAJOR,
      {id: getRandomNumber(), ...event},
    );

    this.destroy();
  };

  /**
   * Обработчик клика по кнопке удаления
   * @private
   */
  #handleDeleteClick = () => {
    this.destroy();
  };

  /**
   * Обработчик нажатия клавиши Esc
   * @param evt Событие клавиатуры
   * @private
   */
  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
