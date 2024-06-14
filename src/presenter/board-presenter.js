import SortView from '../view/sort-view.js';
import EventList from '../view/event-list-view.js';
import CreatForm from '../view/form-creat-view.js';
import EventView from '../view/event-view.js';
import EditForm from '../view/form-edit-view.js';
import {render} from '../render.js';

/** Презентер для отрисовки */
export default class BoardPresenter {
  editListComponent = new EventList();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(new SortView(), this.container);
    render(this.editListComponent, this.container);
    render(new CreatForm(), this.editListComponent.getElement());
    render(new EditForm(), this.editListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.editListComponent.getElement());
    }
  }
}
