import {remove, render, replace} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import {filter} from '../util/filter-utils.js';
import {FilterTypes, UpdateTypes} from '../constant/constant.js';

/** Презентер для управления фильтром */
export default class FilterPresenter {

  /**
   * Контейнер для компонента фильтра
   * @private
   */
  #filterContainer = null;

  /**
   * Модель для настроек фильтра
   * @private
   */
  #filterModel = null;

  /**
   * Модель для данных событий
   * @private
   */
  #eventsModel = null;

  /**
   * Компонент фильтра
   * @private
   */
  #filterComponent = null;

  /**
   * Конструктор презентера фильтра
   * @param filterContainer Контейнер для компонента фильтра
   * @param filterModel Модель для настроек фильтра
   * @param eventsModel Модель для данных событий
   */
  constructor({filterContainer, filterModel, eventsModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;
    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  /** Возвращает список доступных фильтров с количеством событий для каждого */
  get filters() {
    const events = this.#eventsModel.events;
    return Object.values(FilterTypes).map((type) => ({
      type,
      count: filter[type](events).length
    }));
  }

  /** Инициализирует презентер */
  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange,
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  /**
   * Обработчик событий модели
   * @private
   */
  #handleModelEvent = () => {
    this.init();
  };

  /**
   * Обработчик изменения типа фильтра
   * @param filterType Новый тип фильтра
   * @private
   */
  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateTypes.MAJOR, filterType);
  };
}
