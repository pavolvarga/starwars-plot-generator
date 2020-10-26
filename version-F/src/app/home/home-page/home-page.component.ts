import { Component } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
import {ResourceKey} from '../../services/types';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {

  constructor(private appStateService: AppStateService) {

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

}
