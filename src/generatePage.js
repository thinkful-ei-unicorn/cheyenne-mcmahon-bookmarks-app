import store from './store';

//GENERATORS AND OBJECTS

const generateMessageBox = function (message, err) {
  let errClass = err ? 'errMessage' : 'message';

  return `
  <p class= "${errClass}">${message}</p>
  `;
};

const generateRatingList = function (ratingIndex) {
  let ul = [];
  for (let i = 0; i < 5; i++) {
    let ratingIcon =
      i >= ratingIndex
        ? '<i class="far fa-star"></i>'
        : '<i class="fas fa-star"></i>';
    ul.push(`<li class="bookmark-star">${ratingIcon}</li>`);
  }

  return `
  <ul class="bookmark-star-rating">
  ${ul.join('')}
  </ul>`;
};

const generateBookmarkItem = function (item) {
  let expandedInfo = item.expanded ? generateExpandedBookmarkItem(item) : '';

  if (item.rating > store.sort) {
    return `
  <li class="bookmark" id="${item.id}">
  <div class="bookmark-titlebar">
  <p>${item.title}</p>
      ${generateRatingList(item.rating)}
  </div>
    ${expandedInfo}
  </l>`;
  } else {
    return '';
  }
};

const generateExpandedBookmarkItem = function (item) {
  return `
  <div class="bookmark-expanded-info">
  <div class="bookmark-button-container">
  <a href="${item.url}" target ="_blank" class="bookmark-visit-button">visit</a>
    <button class="bookmark-delete-button"><i class="far fa-trash-alt"></i></button>
    
  </div>
    <div class="bookmark-page-content">
      <p>${item.desc}</p>
    </div>
  </div>`;
};

const generateBookMark_HTML = function () {
  let bookmarks = [...store.items];
  return bookmarks.map((item) => generateBookmarkItem(item)).join('');
};



const generateStartHTML = function () {
  return `
    <form class="button-container">
        <input type="button" id="new-item-button" value="New Bookmark" />
        <select id="sort-item-button">
        <option class="sort-option-button" value="0">Show all</option>
        <option class="sort-option-button" value="1">2 * and higher</option>
        <option class="sort-option-button" value="2">3 * and higher</option>
        <option class="sort-option-button" value="3">4 * and higher</option>
        <option class="sort-option-button" value="4">5 *</option>
        </select>
    </form>
    <div id="bookmark-container">
        <ul>
            ${generateBookMark_HTML()}
        </ul>
    </div>
    `;
};

const generateStateTwoHTML = function () {
  return `
        <form id="item-custom">
          <div class="button-container">
              <input type="submit" id="add-item-button" value="Add" />
              <input type="button" id="cancel-item-button" value="cancel" />
          </div>
          <div id="new-item-info-container">
            <input type="text" name="item-name" placeholder="Enter title" />
            <input type="text" name="item-URL" placeholder="Enter website URL" />
            <div id="rating-selection>
            <label for="rating">Select Rating</label>
            <input type="number" id= "rating" name="item-rating" max = "5" min = "1" value = "1" />
            </div>
            <textarea name="item-desc" placeholder="Enter description here (optional)" />
          </div>
        </form>
    </div>
    `;
};



const updatePageState = function (index) {
  let content;
  switch (index) {
    case 0:
      content = generateStartHTML();
      break;
    case 1:
      content = generateStateTwoHTML();
      break;

  }
  return content;
};


export default {
  updatePageState,
  generateMessageBox,
};
