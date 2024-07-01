import AbstractView from '../framework/view/abstract-view.js';

/**
 * Создать шаблон для информации о поездке
 * @return {String}
 */
function createInfoTripTemplate() {
  return (`
        <section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

              <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
            </p>
        </section>
  `);
}

/** Представление для информации о поездке */
export default class InfoTrip extends AbstractView {

  /**
   * Получить шаблон информации назначения
   * @return {String}
   */
  get template() {
    return createInfoTripTemplate();
  }
}
