export default class ColumnChart {
  constructor(options = {}) {
    this.data = options.data || [];
    this.label = options.label;
    this.value = options.value || 0;
    this.link = options.link || '#';
    this.formatHeading = options.formatHeading || (data => data);
    this.render();
  }

  chartHeight = 50;

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;
    if (!this.data.length) {
      this.element.classList.add("column-chart_loading");
    }
  }

  getTemplate() {
    return `
      <div class="column-chart" style="--chart-height: ${this.chartHeight}">
      <div class="column-chart__title">
        ${this.label}
              <a class="column-chart__link" href="${this.link}">View all</a>
      </div>
      <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">
                ${this.formatHeading(this.value)}
            </div>
        <div data-element="body" class="column-chart__chart">
                ${this.renderChart(this.data)}
        </div>
      </div>
    </div>
    `;
  }

  renderChart(data) {
    const maxVal = Math.max(...data);

    return data
      .map((item) => {
        const value = Math.floor(item * this.chartHeight / maxVal);
        const percent = `${((item / maxVal) * 100).toFixed(0)}%`;
        return `<div style='--value: ${value}' data-tooltip='${percent}'></div>`;
      })
      .join("");
  }

  update(newData) {
    const chartColumns = this.element.querySelector(".column-chart__chart");
    chartColumns.innerHTML = this.renderChart(newData);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

}
