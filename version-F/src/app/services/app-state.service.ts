import { Injectable } from '@angular/core';

import { InputFormState, ResourceKey } from './types';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private readonly state: InputFormState;
  private resourceService: ResourceService;

  constructor(resourceService: ResourceService) {

    this.resourceService = resourceService;
    this.state = {
      person: {
        name: 'person',
        plural: 'people',
        visible: true,
        selected: undefined,
        data: [],
        loadingInProgress: false,
        loadFailed: false,
        mandatory: true,
        label: 'character'
      },
      planet: {
        name: 'planet',
        plural: 'planets',
        visible: true,
        selected: undefined,
        data: [],
        loadingInProgress: false,
        loadFailed: false,
        mandatory: true,
        label: 'planet'
      },
      starship: {
        name: 'starship',
        plural: 'starships',
        visible: false,
        selected: undefined,
        data: [],
        loadingInProgress: false,
        loadFailed: false,
        mandatory: false,
        label: 'starship'
      },
      vehicle: {
        name: 'vehicle',
        plural: 'vehicles',
        visible: false,
        selected: undefined,
        data: [],
        loadingInProgress: false,
        loadFailed: false,
        mandatory: false,
        label: 'vehicle'
      },
      species: {
        name: 'species',
        plural: 'species',
        visible: false,
        selected: undefined,
        data: [],
        loadingInProgress: false,
        loadFailed: false,
        mandatory: false,
        label: 'species'
      }
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

  load() {
    function flat(data: any): any[] {
      return ([] as any[]).concat.apply([], data);
    }

    const mandatory = Object.values(this.state).filter(s => s.mandatory);
    mandatory.forEach(s => {
      s.loadingInProgress = true;
      const result = [];
      this.resourceService
        .loadStarWarsData(s.plural)
        .subscribe(
        (input: any) => result.push(input),
        (error: any) => console.log(error),
        () => {
          s.loadingInProgress = false;
          s.data = flat(result);
          console.log('!!', s.data);
        }
      );
    });

  }

}
