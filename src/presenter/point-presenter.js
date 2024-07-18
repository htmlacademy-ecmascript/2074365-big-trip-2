import PointView from '../view/point-view.js';
import EditFormView from '../view/form-edit-view.js';

/**
 * Презентер точки маршрута
 * @class PointPresenter
 * @default
 * @export
 */
export default class PointPresenter {
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
   * Получить экземпляр точки маршрута
   * @public
   * @method getEventView
   * @param id идентификатор
   * @param point точка
   * @param pointsModel модель точек назначения
   * @return {PointView}
   */
  getEventView(id, point, pointsModel) {
    const editForm = new EditFormView({
      id: id,
      point: point,
      pointsModel: pointsModel,
      onFormSubmitClick: this.#onFormSubmitClick
    });
    return new PointView({
      id: id,
      point: point,
      pointsModel: pointsModel,
      editForm: editForm
    });
  }
}
