export class Section {
  constructor ({items, renderer}, conrainerSelector) {
    this._conrainerSelector = conrainerSelector;
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(this._conrainerSelector);
  }

  addItem (item) {
    this._container.append(item);
  }

  renderItems () {
    this._renderedItems.forEach(item => this._renderer(item));
  }

}
