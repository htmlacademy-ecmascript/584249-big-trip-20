import MainPresenter from './presenter.js';

const contentContainer = document.querySelector('.trip-events');
const elementPresenter = new MainPresenter({mainContainer: contentContainer});

elementPresenter.init();
