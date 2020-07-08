export class Section {
  constructor ({items, renderer}, containerSelector) {
    this._containerSelector = containerSelector;
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(this._containerSelector);
  }

  addItem (item) {
    this._container.append(item);
  }

  renderItems () {
    this._renderedItems.forEach(item => this._renderer(item));
  }

}
