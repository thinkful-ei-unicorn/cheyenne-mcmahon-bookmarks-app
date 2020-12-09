import './styles/basic.css';
import './styles/bookmark.css';
import './styles/message.css';
import './styles/create.css';
import './styles/query.css';

import 'normalize.css';
import $ from 'jquery';
import store from './store';
import renderPage from './renderPage';
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
