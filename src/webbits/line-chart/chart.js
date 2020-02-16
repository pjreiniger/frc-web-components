var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Chart } from 'chart.js';
import { html, LitElement, property } from 'lit-element';
/**
* Base Chart of chartjs-web-components
*/
export default class BaseChart extends LitElement {
  constructor() {
      super(...arguments);
      /**
       * Manually update chart
       */
      this.updateChart = () => {
          if (this.chart) {
              this.chart.update();
          }
      };
  }
  /**
   * Called when the dom first time updated. init chart.js data, add observe, and add resize listener
   */
  firstUpdated() {
      const data = this.data || {};
      const options = this.options || {};
      if (!this.chart) {
          const ctx = this.shadowRoot
              .querySelector('canvas')
              .getContext('2d');
          this.chart = new Chart(ctx, {
              type: this.type,
              data,
              options
          });
      }
      else {
          this.chart.type = this.type;
          this.chart.data = data;
          this.chart.options = options;
          this.chart.update();
      }
      this.chart.data = this.observe(this.chart.data);
      for (const prop of Object.keys(this.chart.data)) {
          this.chart.data[prop] = this.observe(this.chart.data[prop]);
      }
      this.chart.data.datasets = this.chart.data.datasets.map((dataset) => {
          dataset.data = this.observe(dataset.data);
          return this.observe(dataset);
      });
      window.addEventListener('resize', () => {
          if (this.chart) {
              this.chart.resize();
          }
      });
  }
  /**
   * Use Proxy to watch object props change
   * @params obj
   */
  observe(obj) {
      const updateChart = this.updateChart;
      return new Proxy(obj, {
          set: (target, prop, val) => {
              target[prop] = val;
              Promise.resolve()
                  .then(updateChart);
              return true;
          }
      });
  }
  /**
   * Use lit-html render Elements
   */
  render() {
      return html `
          <style>
              .chart-size{
                  position: relative;
              }
              canvas{
                  width:400px;
                  height:400px;
              }
          </style>
          <div class="chart-size">
              <canvas></canvas>
          </div>
      `;
  }
  /**
   * Get update state,when element update completed will return true
   */
  get updateComplete() {
      return (async () => {
          return super.updateComplete;
      })();
  }
}
__decorate([
  property()
], BaseChart.prototype, "type", void 0);
__decorate([
  property()
], BaseChart.prototype, "data", void 0);
__decorate([
  property()
], BaseChart.prototype, "options", void 0);
if (!customElements.get('base-chart')) {
  customElements.define('base-chart', BaseChart);
}