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

  private getMandatory() {
    return Object.values(this.state).filter(s => s.mandatory);
  }

  private getOptional() {
    return Object.values(this.state).filter(s => !s.mandatory);
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
    return [ ... this.getOptional() ];
  }

  load() {
    function flat(data: any): any[] {
      return ([] as any[]).concat.apply([], data);
    }

    this.getMandatory().forEach((s, i) => {
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
        }
      );
    });
  }

  isMandatoryDataLoaded() {
    return this.getMandatory().every(r => r.data.length > 0);
  }

  selectItem(resourceName: string, value: string) {
    this.state[resourceName].selected = value;
  }

  resetItem(resourceName: string) {
    this.state[resourceName].selected = undefined;
  }

  areMandatoryFieldsSelected() {
    return this.getMandatory().every(s => s.selected !== undefined);
  }

}
