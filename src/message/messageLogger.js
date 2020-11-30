import renderPage from '../page/renderPage';

let lastMessage = '';


const logErrorMessage = function (message) {
  renderPage.renderMessage(message, true);
};

export default {
  logErrorMessage,
  };
