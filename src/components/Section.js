export class Section {
  constructor (items, {renderer}, containerSelector) {
    this._containerSelector = containerSelector;
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(this._containerSelector);
  }

  addItem (item) {
    this._container.prepend(item);
  }

  renderItems () {
    this._renderedItems.reverse().forEach(item => this._renderer(item));
  }
}
