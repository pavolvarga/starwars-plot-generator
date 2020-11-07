import { Component } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
import { ResourceKey } from '../../services/types';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {

  appStateService: AppStateService;

  constructor(appStateService: AppStateService) {
    this.appStateService = appStateService;
  }

  ngOnInit() {
    this.appStateService.load();
  }

  getInputs() {
    return this.appStateService.getVisibleInputs();
  }

  getOptionalInputs() {
    return this.appStateService.getOptionalInputs();
  }

  getOptionalButtonLabel(name: ResourceKey) {
    const visible = this.appStateService.isInputVisible(name);
    return visible ? `Remove ${name}` : `Add ${name}`;
  }

  toggleVisibility(name: ResourceKey) {
    this.appStateService.toggleVisibility(name);
  }

  isMandatoryDataLoaded() {
    return this.appStateService.isMandatoryDataLoaded();
  }

  areMandatoryFieldsSelected() {
    return this.appStateService.areMandatoryFieldsSelected();
  }

}
