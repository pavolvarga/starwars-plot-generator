import { Injectable } from '@angular/core';

import { InputFormState, ResourceKey, Suggestion } from './types';
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

  loadResourceData(name: ResourceKey) {
    function flat(data: any): any[] {
      return ([] as any[]).concat.apply([], data);
    }

    // do not load data, if loaded previously
    if (this.state[name].data.length > 0) {
      return;
    }

    const result = [];
    this.resourceService
      .loadStarWarsData(this.state[name].plural)
      .subscribe(
        (input: any) => result.push(input),
        (error: any) => {
          this.state[name].loadFailed = true;
        },
        () => {
          this.state[name].data = flat(result);
        }
      );
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

  loadMandatoryData() {
    this.getMandatory().forEach(s => {
      this.loadResourceData(s.name)
    });
  }

  isMandatoryDataLoaded() {
    return this.getMandatory().every(r => r.data.length > 0);
  }

  isDataLoaded(name: ResourceKey) {
    return this.state[name].data.length > 0;
  }

  selectItem(name: ResourceKey, value: Suggestion) {
    this.state[name].selected = value;
  }

  resetItem(name: ResourceKey) {
    this.state[name].selected = undefined;
  }

  getData(name: ResourceKey, filter: string) {
    return [...this.state[name].data.filter(d => d.name.toLowerCase().startsWith(filter.toLowerCase()))];
  }

  areMandatoryItemsSelected() {
    return this.getMandatory().every(s => s.selected !== undefined);
  }

  getSelectedItems() {
    return Object.values(this.state).filter(s => s.selected).map(s => ({name: s.name, value: s.selected}));
  }

  hasFailedLoadOfMandatoryData() {
    return this.getMandatory().some(r => r.loadFailed);
  }

  hasFailedLoadOfResourceData(name: ResourceKey) {
    return this.state[name].loadFailed;
  }

  getFailedOptionalResourceData() {
    return [...this.getOptional().filter(r => r.loadFailed)];
  }

  resetLoadFailed(name: ResourceKey) {
    this.state[name].loadFailed = false;
  }

  resetSelectedItems() {
    Object.values(this.state).forEach(r => {
      r.selected = undefined;
    });
  }
}
