import { html, css } from '@webbitjs/webbit';
import Container from '../../container';

export default class Fms extends Container {

  static get metadata() {
    return {
      displayName: 'FMS',
      category: 'Simulation',
      // description: 'Component for displaying data from a 3-axis accelerometer.',
      // documentationLink: 'https://frc-web-components.github.io/components/number-bar/'
    };
  }

  static get properties() {
    return {
      ...super.properties,
      fms: { type: Boolean },
      ds: { type: Boolean },
      station: { type: String },
      matchTimeEnabled: { type: Boolean },
      matchTime: { type: Number },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        [part=form] {
          width: 100%;
          display: inline-grid;
          grid-template-columns: min-content auto;
          grid-auto-rows: 30px;
          column-gap: 15px;
          align-items: center;
        }

        [part=input] {
          width: 100%;
          min-width: 0;
        }

        label {
          white-space: nowrap;
          text-align: right;
        }

        vaadin-checkbox::part(checkbox) {
          margin: 0;
        }

        [part=header] {
          font-size: 15px;
          font-weight: bold;
          margin-bottom: 7px;
          color: #555;
        }
      `
    ];
  }

  constructor() {
    super();
  
    this.display = 'inline-block';
    this.width = '300px';
    this.height = 'auto';
    this.fontFamily = 'sans-serif';

    this.fms = false;
    this.ds = false;
    this.station = 'red1';
    this.matchTimeEnabled = true;
    this.matchTime = 0;

    this.sourceKey = 'driverStation';
    this.sourceProvider = 'HALSim';
  }

  onFmsChange(ev) {
    const target = ev.target || ev.path[0];
    this.fms = target.checked;
  }

  onDsChange(ev) {
    const target = ev.target || ev.path[0];
    this.ds = target.checked;
  }

  onStationChange(ev) {
    const element = ev.target || ev.path[0];
    this.station = element.value;
  }

  onMatchTimeEnabledChange(ev) {
    const target = ev.target || ev.path[0];
    this.matchTimeEnabled = target.checked;
  }

  onMatchTimeChange(ev) {
    const target = ev.target || ev.path[0];
    this.matchTime = target.checked;
  }

  render() {
    return html`
      <div part="form">
        <label part="header">FMS</label>
        <div></div>
        <label>FMS Attached</label>
        <vaadin-checkbox 
          part="input" 
          ?checked="${this.fms}" 
          @change="${this.onFmsChange}"
        ></vaadin-checkbox>
        <label>DS Attached</label>
        <vaadin-checkbox 
          part="input" 
          ?checked="${this.ds}"
          @change="${this.onDsChange}"
        ></vaadin-checkbox>
        <label>Alliance Station</label>
        <vaadin-select 
          part="input" 
          theme="small" 
          value="${this.station}"
          @change="${this.onStationChange}"
        >
          <template>
            <vaadin-list-box>
              <vaadin-item value="red1">Red 1</vaadin-item>
              <vaadin-item value="red2">Red 2</vaadin-item>
              <vaadin-item value="red3">Red 3</vaadin-item>
              <vaadin-item value="blue1">Blue 1</vaadin-item>
              <vaadin-item value="blue2">Blue 2</vaadin-item>
              <vaadin-item value="blue3">Blue 3</vaadin-item>
            </vaadin-list-box>
          </template>
        </vaadin-select>
        <label>Match Time Enabled</label>
        <vaadin-checkbox 
          part="input" 
          ?checked="${this.matchTimeEnabled}"
          @change="${this.onMatchTimeEnabledChange}"
        ></vaadin-checkbox>
        <label>Match Time</label>
        <vaadin-number-field 
          part="input" 
          value="${this.matchTime}" 
          clear-button-visible
          has-controls
          theme="small"
          @change="${this.onMatchTimeChange}"
        ></vaadin-number-field>
      </div>
    `;
  }
}

webbitRegistry.define('frc-sim-fms', Fms);