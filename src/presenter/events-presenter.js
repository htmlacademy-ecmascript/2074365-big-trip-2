import {remove, render, RenderPosition} from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import EmptyView from '../view/empty-view.js';
import EventPresenter from './event-presenter.js';
import {FilterTypes, SortTypes, TimeLimit, UpdateTypes, UserActions} from '../constant/constant.js';
import {sortEventsByDay, sortEventsByDuration, sortEventsByPrice} from '../util/event-utils.js';
import {filter} from '../util/filter-utils.js';
import TripInfoView from '../view/trip-info-view.js';
import NewEventPresenter from './new-event-presenter.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import LoadingView from '../view/loading-view.js';
import PointsLoadErrorView from '../view/points-load-error-view.js';


/** Презентер для представления событий */
export default class EventsPresenter {

  /**
   * Контейнер для представления событий
   * @private
   */
  #eventsContainer = null;

  /**
   * Контейнер для заголовка
   * @private
   */
  #headerContainer = null;

  /**
   * Модель для данных событий
   * @private
   */
  #eventsModel = null;

  /**
   * Модель для настроек фильтрации
   * @private
   */
  #filterModel = null;

  /**
   * Компонент для отображения информации о поездке
   * @private
   */
  #tripInfoComponent = null;

  /**
   * Компонент для сортировки событий
   * @private
   */
  #tripSortComponent = null;

  /**
   * Компонент для отображения списка событий
   * @private
   */
  #eventListComponent = new EventsListView();

  /**
   * Компонент для отображения сообщения "нет событий"
   * @private
   */
  #noEventsComponent = null;

  /**
   * @type {LoadingView}
   * @description Компонент загрузки, отображаемый во время загрузки данных
   * @private
   */
  #loadingComponent = new LoadingView();

  /**
   * @type {PointsLoadErrorView}
   * @description Компонент ошибки загрузки точек, отображаемый при возникновении ошибки
   * @private
   */
  #pointsLoadErrorComponent = new PointsLoadErrorView();

  /**
   * Карта презентеров событий, ключом является ID события
   * @private
   */
  #eventPresenters = new Map();

  /**
   * Презентер для создания нового события
   * @private
   */
  #newEventPresenter = null;

  /**
   * Текущий тип сортировки
   * @type {SortTypes}
   * @private
   */
  #currentSortType = SortTypes.DAY;

  /**
   * Текущий тип фильтрации.
   * @type {FilterTypes}
   * @private
   */
  #filterType = FilterTypes.EVERYTHING;

  /**
   * @type {boolean}
   * @description Флаг, для загрузки данных
   * @private
   */
  #isLoading = true;

  /**
   * @type {UiBlocker}
   * @description Экземпляр класса UiBlocker, который используется для блокировки взаимодействия с интерфейсом пользователя
   * @property {number} lowerLimit Нижний предел времени блокировки UI
   * @property {number} upperLimit Верхний предел времени блокировки UI
   */
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  /**
   * Конструктор презентера событий
   * @param eventsContainer Контейнер для представления событий
   * @param headerContainer Контейнер для заголовка
   * @param eventsModel Модель для данных событий
   * @param filterModel Модель для настроек фильтрации
   * @param onNewEventDestroy Обратный вызов при уничтожении презентера нового события
   */
  constructor({eventsContainer, headerContainer, eventsModel, filterModel, onNewEventDestroy}) {
    this.#eventsContainer = eventsContainer;
    this.#headerContainer = headerContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;


    this.#newEventPresenter = new NewEventPresenter({
      onDestroy: onNewEventDestroy,
    });

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  /** Возвращает отфильтрованные и отсортированные события */
  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = filter[this.#filterType](events);

    switch (this.#currentSortType) {
      case SortTypes.DAY:
        return filteredEvents.sort(sortEventsByDay);

      case SortTypes.PRICE:
        return filteredEvents.sort(sortEventsByPrice);

      case SortTypes.TIME:
        return filteredEvents.sort(sortEventsByDuration);
    }

    return filteredEvents;
  }

  /** Возвращает список доступных предложений */
  get offers() {
    return [...this.#eventsModel.offers];
  }

  /** Возвращает список доступных направлений */
  get destinations() {
    return [...this.#eventsModel.destinations];
  }

  /** Инициализирует презентер */
  init() {
    this.#renderTripInfo();
    this.#renderEventsListContainer();
    this.#renderEventsBoard();
  }

  /** Создает новое событие */
  createEvent(onNewEventDestroy) {
    this.#newEventPresenter = new NewEventPresenter({
      eventListContainer: this.#eventListComponent.element,
      offers: this.offers,
      destinations: this.destinations,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy,
    });

    this.#currentSortType = SortTypes.DAY;
    this.#filterModel.setFilter(UpdateTypes.MAJOR, FilterTypes.EVERYTHING);

    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }

    this.#newEventPresenter.init();
  }

  /** Перерисовывает компонент отсутствия событий, если список событий пуст */
  rerenderNoEventsComponent() {
    if (this.events.length === 0) {
      this.#renderNoEvents();
    }
  }

  /** Рендерит контейнер списка событий */
  #renderEventsListContainer() {
    render(this.#eventListComponent, this.#eventsContainer, RenderPosition.BEFOREEND);
  }

  /**
   * Рендерит информацию о поездке
   * @private
   */
  #renderTripInfo() {
    if (this.#tripInfoComponent) {
      remove(this.#tripInfoComponent);
    }

    if (this.events.length === 0) {
      return;
    }

    this.#tripInfoComponent = new TripInfoView({
      events: this.events,
      offers: this.offers,
      destinations: this.destinations
    });

    render(this.#tripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  }

  /**
   * Рендерит компонент сортировки
   * @private
   */
  #renderTripSort() {
    this.#tripSortComponent = new TripSortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#tripSortComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  }

  /**
   * Рендерит список событий
   * @private
   */
  #renderEventsList() {
    this.events.forEach((event) => this.#renderEvent(event));
  }

  /** Рендерит компонент загрузки данных */
  #renderLoading() {
    render(this.#loadingComponent, this.#eventsContainer, RenderPosition.BEFOREEND);
  }

  /** Рендерит компонент ошибки загрузки точек */
  #renderPointsLoadError() {
    render(this.#pointsLoadErrorComponent, this.#eventsContainer, RenderPosition.BEFOREEND);
  }

  /**
   * Рендерит сообщение "нет событий"
   * @private
   */
  #renderNoEvents() {
    this.#noEventsComponent = new EmptyView({
      filterType: this.#filterType,
    });
    render(this.#noEventsComponent, this.#eventsContainer);
  }

  /**
   * Рендерит отдельное событие
   * @param event Событие для рендеринга
   * @private
   */
  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventsListContainer: this.#eventListComponent.element,
      offers: this.offers,
      destinations: this.destinations,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);

  }

  /** Очищает список событий */
  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  /**
   * Очищает доску событий
   * @param resetSortType Флаг сброса типа сортировки
   * @private
   */
  #clearEventsBoard({resetSortType = false}) {
    this.#newEventPresenter.destroy();
    this.#clearEventsList();

    remove(this.#tripSortComponent);
    remove(this.#loadingComponent);

    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  }

  /**
   * Рендерит доску событий
   * @private
   */
  #renderEventsBoard() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.events.length === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderTripSort();
    this.#renderEventsList();
  }

  /**
   * Обработчик изменения режима
   * @private
   */
  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  /**
   * Обрабатывает изменения во вьюшках и модели
   * @param actionType Тип действия пользователя
   * @param updateType Тип изменения данных
   * @param update Обновленные данные
   * @private
   */
  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserActions.UPDATE_EVENT:
        this.#eventPresenters.get(update.id).setSaving();
        try {
          await this.#eventsModel.updateEvent(updateType, update);
        } catch (err) {
          this.#eventPresenters.get(update.id).setAborting();
        }

        this.#renderTripInfo();
        break;
      case UserActions.ADD_EVENT:
        this.#newEventPresenter.setSaving();

        try {
          await this.#eventsModel.addEvent(updateType, update);
        } catch (err) {
          this.#newEventPresenter.setAborting();
        }

        this.#renderTripInfo();
        break;
      case UserActions.DELETE_EVENT:
        this.#eventPresenters.get(update.id).setDeleting();
        try {
          await this.#eventsModel.deleteEvent(updateType, update);
        } catch (err) {
          this.#eventPresenters.get(update.id).setAborting();
        }

        this.#renderTripInfo();

        break;
    }

    this.#uiBlocker.unblock();
  };

  /**
   * Обрабатывает события модели
   * @param updateType Тип изменения данных
   * @param data Обновленные данные
   * @private
   */
  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateTypes.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;

      case UpdateTypes.MINOR:
        this.#clearEventsBoard({resetSortType: false});
        this.#renderTripInfo();
        this.#renderEventsBoard();
        break;

      case UpdateTypes.MAJOR:
        this.#clearEventsBoard({resetSortType: true});
        this.#renderEventsBoard();
        if (!this.#headerContainer.querySelector('.trip-info')) {
          this.#renderTripInfo();
        }
        break;

      case UpdateTypes.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderTripInfo();
        this.#renderEventsBoard();
        break;

      case UpdateTypes.POINTS_LOAD_ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        remove(this.#noEventsComponent);
        this.#renderPointsLoadError();
        break;
    }
  };

  /**
   * Обрабатывает изменение типа сортировки
   * @param sortType Новый тип сортировки
   * @private
   */
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearEventsBoard({resetSortType: false});
    this.#renderEventsBoard();
  };
}
