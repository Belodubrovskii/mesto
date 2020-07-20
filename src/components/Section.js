export class Section {
  constructor ({renderer}, containerSelector) {
    this._containerSelector = containerSelector;
    // this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(this._containerSelector);
  }

  addItem (item) {
    this._container.prepend(item);
  }

  renderItems (items) {
    items.reverse().forEach(item => this._renderer(item));
  }
}
