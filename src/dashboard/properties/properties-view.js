import { LitElement, html, css } from 'lit-element';
import './string-property-view';
import './number-property-view';
import './boolean-property-view';
import './array-property-view';
import './boolean-array-property-view';
import './string-array-property-view';
import './number-array-property-view';
import './text-area-property-view';
import './string-dropdown-property-view';
import './color-picker-property-view';
import './function-property-view';

class PropertiesView extends LitElement {

  static get styles() {
    return css`
      :host {
        display: block;
        margin-bottom: 10px;
      }

      [part=category-name] {
        text-transform: capitalize;
      }
    `;
  }

  static get properties() {
    return {
      wom: { type: Object },
      selectedNode: { type: Object, attribute: false },
    };
  }

  constructor() {
    super();
    this.wom = null;
    this.selectedNode = null;
    this.inputElements = [];
  }

  updated(changedProperties) {
    if (changedProperties.has('selectedNode')) {
      this.inputElements = this.shadowRoot.querySelectorAll('[part="input"]');
    }
  }

  isInputModified() {
    for (let input of this.inputElements) {
      if (input.isInputModified()) {
        return true;
      }
    }
    return false;
  }

  isValid() {
    for (let input of this.inputElements) {
      if (!input.isValid()) {
        return false;
      }
    }
    return true;
  }

  getPropertyValueMap() {
    const propertyValueMap = {};

    for (let input of this.inputElements) {
      const [propertyName, inputValue] = input.getPropertyNameValuePair();
      propertyValueMap[propertyName] = inputValue;
    }

    return propertyValueMap;
  }

  cancel() {
    for (let input of this.inputElements) {
      input.cancel();
    }
  }

  renderProperties(properties) {

    return html`
      <vaadin-form-layout>
        ${properties.map(([name, property]) => html`
          ${property.inputType === 'String' ? html`
            <dashboard-string-property-view
              part="input"
              .selectedNode="${this.selectedNode}"
              .propertyName="${name}"
              .property="${property}"
            ></dashboard-string-property-view>
          ` : ''}

          ${property.inputType === 'Number' ? html`
            <dashboard-number-property-view
              part="input"
              .selectedNode="${this.selectedNode}"
              .propertyName="${name}"
              .property="${property}"
            ></dashboard-number-property-view>
          ` : ''}

          ${property.inputType === 'Boolean' ? html`
            <dashboard-boolean-property-view
              part="input"
              .selectedNode="${this.selectedNode}"
              .propertyName="${name}"
              .property="${property}"
            ></dashboard-boolean-property-view>
          ` : ''}

          ${property.inputType === 'Array' ? html`
            <dashboard-array-property-view
              part="input"
              .selectedNode="${this.selectedNode}"
              .propertyName="${name}"
              .property="${property}"
            ></dashboard-array-property-view>
          ` : ''}

          ${property.inputType === 'BooleanArray' ? html`
            <dashboard-boolean-array-property-view
              part="input"
              .selectedNode="${this.selectedNode}"
              .propertyName="${name}"
              .property="${property}"
            ></dashboard-boolean-array-property-view>
          ` : ''}

          ${property.inputType === 'StringArray' ? html`
            <dashboard-string-array-property-view
              part="input"
              .selectedNode="${this.selectedNode}"
              .propertyName="${name}"
              .property="${property}"
            ></dashboard-string-array-property-view>
          ` : ''}

          ${property.inputType === 'NumberArray' ? html`
            <dashboard-number-array-property-view
              part="input"
              .selectedNode="${this.selectedNode}"
              .propertyName="${name}"
              .property="${property}"
            ></dashboard-number-array-property-view>
          ` : ''}

          ${property.inputType === 'Textarea' ? html`
            <dashboard-text-area-property-view
              part="input"
              .selectedNode="${this.selectedNode}"
              .propertyName="${name}"
              .property="${property}"
            ></dashboard-text-area-property-view>
          ` : ''}

          ${property.inputType === 'StringDropdown' ? html`
            <dashboard-string-dropdown-property-view
              part="input"
              .selectedNode="${this.selectedNode}"
              .propertyName="${name}"
              .property="${property}"
            ></dashboard-string-dropdown-property-view>
          ` : ''}

          ${property.inputType === 'ColorPicker' ? html`
            <dashboard-color-picker-property-view
              part="input"
              .selectedNode="${this.selectedNode}"
              .propertyName="${name}"
              .property="${property}"
            ></dashboard-color-picker-property-view>
          ` : ''}

          ${property.inputType === 'Function' ? html`
            <dashboard-function-property-view
              part="input"
              .selectedNode="${this.selectedNode}"
              .propertyName="${name}"
              .property="${property}"
            ></dashboard-function-property-view>
          ` : ''}
        `)}
      </vaadin-form-layout>
    `;
  }

  render() {

    const properties = Object.entries(this.selectedNode.getNode().constructor.properties);

    const propertiesForSources = properties.filter(([name, property]) => {
      return property.canConnectToSources;
    });

    return html`
      ${this.renderProperties(propertiesForSources)}
    `;
  }
}

customElements.define('dashboard-properties-view', PropertiesView);