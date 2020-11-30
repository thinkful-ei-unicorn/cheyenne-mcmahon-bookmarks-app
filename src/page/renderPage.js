import $ from 'jquery';
import generatePage from './generatePage';
import store from '../data/localStore';

let buildPage = function () {
  $('#container').html(`<section id="contentbox"></section>
    <footer id="messagebox"></footer>`);
};

let render = function (renderState) {
  let scroll = $('main #bookmark-container').scrollTop();

  $('#contentbox').html(generatePage.updatePageState(renderState));

  $('main #bookmark-container').scrollTop(scroll);
  $('#sort-item-button').val(store.sort);
};

let renderMessage = function (message, err) {
  $('#messagebox').html(generatePage.generateMessageBox(message, err));
};

export default {
  render,
  renderMessage,
  buildPage,
};
