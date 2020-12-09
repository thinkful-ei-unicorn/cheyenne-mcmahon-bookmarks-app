import api from "./api";


const items = [];
const sort = 0;

const addItem = function (newItem) {
  newItem.expanded = false;
  this.items.push(newItem);
};

const findItem = function (id) {
  return this.items.find((item) => item.id === id);
};

const deleteItem = function (id) {
  this.items = this.items.filter((item) => item.id !== id);
};

const updateItemDataBase = function () {
  this.items = [];
  return api.getAllItems().then((fetchedItems) => {
    fetchedItems.forEach((item) => this.addItem(item));
  });
};

export default {
  addItem,
  findItem,
  deleteItem,
  updateItemDataBase,

  items,
  sort,
  };
