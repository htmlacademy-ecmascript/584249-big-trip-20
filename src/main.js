import './view/brief-view.js';
import './view/add-view.js';
import './view/filter-view.js';
import './view/sort-view.js';
import './view/list-view.js';
import './view/card-view.js';
import './view/placeholder-view.js';
import './view/overlay-view.js';

import ApiService from './services/api-service.js';
import AppModel from './models/app-model.js';

import BriefPresenter from './presenters/brief-presenter.js';
import AddPresenter from './presenters/add-presenter.js';
import SortPresenter from './presenters/sort-presenter.js';
import FilterPresenter from './presenters/filter-presenter.js';
import ListPresenter from './presenters/list-presenter.js';
import PlaceholderPresenter from './presenters/placeholder-presenter.js';
import OverlayPresenter from './presenters/overlay-presenter.js';

const apiService = new ApiService({authorization: 'Basic eo0w590ik298892'});
const appModel = new AppModel(apiService);

new PlaceholderPresenter(document.querySelector('placeholder-view'), appModel);

appModel.load().then(() => {
  new BriefPresenter(document.querySelector('brief-view'), appModel);
  new AddPresenter(document.querySelector('add-view'));
  new SortPresenter(document.querySelector('sort-view'), appModel);
  new FilterPresenter(document.querySelector('filter-view'), appModel);
  new ListPresenter(document.querySelector('list-view'), appModel);
  new OverlayPresenter(document.querySelector('overlay-view'), appModel);
});
