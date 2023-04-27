import {render} from './render.js';

import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import TravelListView from './view/travel-list-view.js';
import CreatePointFormView from './view/create-point-form-view.js';
import EditPointFormView from './view/edit-point-form-view.js';
import TravelListItemContainerView from './view/travel-list-item-view.js';
import TravelListItemContentView from './view/travel-list-item-content.js';

const siteFilter = document.querySelector('.trip-controls__filters');

export default class MainPresenter {

  travelListView = new TravelListView();
  travelListItemContainer = new TravelListItemContainerView();

  constructor({mainContainer}) {
    this.mainContainer = mainContainer;
  }

  init () {
    render(new FilterView(), siteFilter);
    render(new SortView(), this.mainContainer);
    render(this.travelListView, this.mainContainer);

    const editForm = new TravelListItemContainerView();
    render(new EditPointFormView(), editForm.getElement());
    render(editForm, this.travelListView.getElement());

    for (let i = 0; i < 3; i++) {
      const listItem = new TravelListItemContainerView();
      render(new TravelListItemContentView(), listItem.getElement());
      render(listItem, this.travelListView.getElement());
    }

    const createForm = new TravelListItemContainerView();
    render(new CreatePointFormView(), createForm.getElement());
    render(createForm, this.travelListView.getElement());
  }
}
