import Action from '../action';

export default class CutNode extends Action {

  constructor() {
    super({
      needsSelection: true,
      needsTarget: true
    });
  }

  execute({ wom, selectedNode }) {
    
  }
}