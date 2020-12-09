import store from './store';
import $ from 'jquery';
import renderPage from './renderPage';
import api from './api';

const getIdFromElement = function (element) {
  return $(element).closest('.bookmark').attr('id');
};



// HANDLE TRANSITION EVENTS
const handleTransitionEvents = function () {
  $('main').on('click', '#new-item-button', (e) => {
    e.preventDefault();


    renderPage.render(1);
  });
  $('main').on('click', '#cancel-item-button', (e) => {
    e.preventDefault();


    renderPage.render(0);
  });
};



//EVENTS THAT SUBMIT DATA AND THEN TRANSITION
const handleSubmitEvents = function () {
  $('main').on('submit', '#item-custom', (e) => {
    e.preventDefault();

    let itemName = $('main input[name="item-name"]').val();
    let itemURL = $('main input[name="item-URL"]').val();
    let itemDesc = $('main textarea').val();
    let itemRating = $('main input[name="item-rating"]').val();

    let error = checkErrors(
      [
        itemName === '',
        itemURL === '',
        !itemURL.includes('https://') && !itemURL.includes('http://'),
      ],
      [
        'Title field cannot be empty',
        'URL field cannot be empty',
        'URL field must contain http(s)://',
      ]
    );

    if (!error) {
      let newItem = {
        title: itemName,
        url: itemURL,
        desc: itemDesc,
        rating: itemRating,
      };



      api.addItem(newItem)
        .then(() => store.updateItemDataBase())
        .then(() => renderPage.render(0));
      logErrorMessage('');
    } else {
      logErrorMessage(error);
    }
  });
};

//ERROR CHECKING AND LOGGING

const checkErrors = function (errs, messages) {
  for (let i = 0; i < errs.length; i++) {
    if (errs[i] === true) {
      return messages[i];
    }
  }
}

const logErrorMessage = function (message) {
  renderPage.renderMessage(message, true);
};

//EVENTS RELATED TO THE BOOKMARK
//EXPANDING DELETING AND STORING

const handleBookmarkEvents = function () {
  $('main').on('click', '.bookmark-titlebar', (e) => {
    let id = getIdFromElement(e.currentTarget);
    store.findItem(id).expanded = !store.findItem(id).expanded;

    renderPage.render(0);
  });

  $('main').on('click', '.bookmark-delete-button', (e) => {
    let id = getIdFromElement(e.currentTarget);
    api.deleteItem(id).then(() => {
      store.deleteItem(id);
      renderPage.render(0);

    });
  });

  $('main').on('change', '#sort-item-button', (e) => {
    store.sort = $(e.target).val();
    renderPage.render(0);
  });
};



export default {
  handleTransitionEvents,
  handleSubmitEvents,
  handleBookmarkEvents
};