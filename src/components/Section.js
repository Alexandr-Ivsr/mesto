class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    this._initialArray.forEach((item) => {
      const cardElement = this._renderer(item);
      this.addItem(cardElement);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}

export default Section;
