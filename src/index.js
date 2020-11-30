require('./styles/basic.css');
require('./styles/bookmark.css');
require('./styles/message.css');
require('./styles/create.css');
require('./styles/query.css');

import 'normalize.css';
import $ from 'jquery';
import store from './data/localStore';
import renderPage from './page/renderPage';
import eventHandler from './eventHandler';

const main = function () {
  renderPage.buildPage();
  store.updateItemDataBase().then(() => {
    eventHandler.handleTransitionEvents();
    eventHandler.handleSubmitEvents();
    eventHandler.handleBookmarkEvents();
    renderPage.render(0);
  });
};

$(main);
