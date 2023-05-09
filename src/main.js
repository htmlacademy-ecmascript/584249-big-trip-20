import './view/brief-view.js';
import './view/add-view.js';
import './view/filter-view.js';
import './view/sort-view.js';
import './view/list-view.js';
import './view/card-view.js';

import AppModel from './models/app-model.js';

import BriefPresenter from './presenters/brief-presenter.js';
import AddPresenter from './presenters/add-presenter.js';
import SortPresenter from './presenters/sort-presenter.js';
import FilterPresenter from './presenters/filter-presenter.js';
import ListPresenter from './presenters/list-presenter.js';

const appModel = new AppModel();

new BriefPresenter(document.querySelector('brief-view'));
new AddPresenter(document.querySelector('add-view'));
new SortPresenter(document.querySelector('sort-view'));
new FilterPresenter(document.querySelector('filter-view'));
new ListPresenter(document.querySelector('list-view'), appModel);

