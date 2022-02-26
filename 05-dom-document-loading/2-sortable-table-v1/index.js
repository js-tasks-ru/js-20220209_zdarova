export default class SortableTable {
  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.render();
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements();
  }

  getTemplate() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.getTHead()}
          </div>
          <div data-element="body" class="sortable-table__body">
            ${this.getTRows(this.data)}
          </div>
        </div>
      </div>
    `;
  }

  getTHead() {
    return this.headerConfig.map(({id, title, sortable}) => {
      return `
        <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
          <span>${title}</span>
          ${sortable ? this.getArrowTemplate() : ''}
        </div>
      `;
    }).join('');
  }

  getTRows(data) {
    return data.map((item) => {
      return `
        <a href="/products/${item}" class="sortable-table__row">
          ${this.getRow(item)}
        </a>
      `;
    }).join('');
  }

  getRow(item) {
    return this.headerConfig.map(({id, template}) => {
      return template ? template(item[id]) : `<div class="sortable-table__cell">${item[id]}</div>`;
    }).join('');
  }

  getArrowTemplate() {
    return `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sortable-table__sort-arrow_${1}"></span>
      </span>
    `;
  }

  getSubElements() {
    const subElements = {};
    const elements = this.element.querySelectorAll('[data-element]');
    for (const subElement of elements) {
      const name = subElement.dataset.element;
      subElements[name] = subElement;
    }
    return subElements;
  }

  sort(field, direction) {
    const sortedData = this.getSortedItems(field, direction);
    const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id="${field}"]`);
    currentColumn.dataset.order = direction;
    this.subElements.body.innerHTML = this.getTRows(sortedData);
  }

  getSortedItems(field, direction) {
    const directions = {
      asc: 1,
      desc: -1
    };
    const column = this.headerConfig.find((item) => item.id === field);
    const sortType = column.sortType;
    const order = directions[direction];
    const dataArray = [...this.data];
    return dataArray.sort((a, b) => {
      if (sortType === 'string') {
        return order * (a[field].localeCompare(b[field], ['ru', 'en']));
      }
      return order * (a[field] - b[field]);
    });
  }


  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
