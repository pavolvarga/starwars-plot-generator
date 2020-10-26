import { Injectable } from '@angular/core';
import { InputFormState, ResourceKey } from './types';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  state: InputFormState;

  constructor() {

    this.state = {
      person: { name: 'person', visible: true, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, mandatory: true, label: 'character'},
      planet: { name: 'planet', visible: true, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, mandatory: true, label: 'planet'},
      starship: { name: 'starship', visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, mandatory: false, label: 'starship'},
      vehicle: { name: 'vehicle', visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, mandatory: false, label: 'vehicle'},
      species: { name: 'species', visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false, mandatory: false, label: 'species'}
    };
  }

  toggleVisibility(name: ResourceKey) {
    const current = this.state[name];
    current.visible = !current.visible;
  }

  isInputVisible(name: ResourceKey) {
    return this.state[name].visible;
  }

  getVisibleInputs() {
    return [ ...Object.values(this.state).filter(s => s.visible) ];
  }

  getOptionalInputs() {
    return [ ... Object.values(this.state).filter(s => !s.mandatory) ];
  }

}
