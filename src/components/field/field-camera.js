import FieldObject from './field-object';
import { objectWithout } from './utils';

class FieldCamera extends FieldObject {

  static get metadata() {
    return {
      displayName: 'Field Camera',
      category: 'Field',
      // description: 'Component for displaying information about an encoder',
      // documentationLink: 'https://frc-web-components.github.io/components/encoder/',
      slots: [],
      allowedParents: ['frc-field-object', 'frc-field-robot', 'frc-field'],
    };
  }

  static get properties() {
    return {
      ...objectWithout(super.properties, ['width', 'height', 'draw']),
      fov: { type: Number },
      range: { type: Number },
      seesTarget: { type: Boolean },
      targetDistance: { 
        type: Number,
        converter: (value) => {
          return parseFloat(value);
        },
        get() {
          return isNaN(this._targetDistance) ? this.range : this._targetDistance;
        }
      }
    };
  }

  constructor() {
    super();
    this.fov = 60;
    this.range = 5;
    this.seesTarget = false;
  }

  renderDrawing({ ctx, scalingFactor, parentWidth, parentHeight }) {

    const distance = this.seesTarget ? this.targetDistance : this.range;

    // draw FOV
    if (this.fov > 0) {
      ctx.save();
      ctx.lineWidth = 1 / scalingFactor;
      ctx.fillStyle = this.seesTarget ? 'rgba(0, 255, 0, .4)' : 'rgba(255, 0, 0, .4)';
      // ctx.translate(this.x, this.y);
      ctx.moveTo(0, 0);
      const x = distance * Math.tan(this.fov / 2 * Math.PI / 180);

      ctx.lineTo(-x, distance);
      ctx.lineTo(x, distance);
      ctx.fill();
      ctx.restore();
    } else {
      // draw line to target
      ctx.beginPath();
      ctx.lineWidth = 1 / scalingFactor;
      ctx.strokeStyle = this.seesTarget ? "rgb(0, 255, 0)" : 'rgb(255, 0, 0)';
      // ctx.translate(this.x, this.y);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, distance);
      ctx.stroke();
    }
  }
}

webbitRegistry.define('frc-field-camera', FieldCamera);