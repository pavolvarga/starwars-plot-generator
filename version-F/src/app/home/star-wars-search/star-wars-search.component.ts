import { Component, Input, OnInit } from '@angular/core';

import { AppStateService } from '../../services/app-state.service';
import { ResourceKey, Suggestion } from '../../services/types';

@Component({
  selector: 'app-star-wars-search',
  templateUrl: './star-wars-search.component.html',
  styleUrls: ['./star-wars-search.component.css']
})
export class StarWarsSearchComponent implements OnInit {
  keyword = 'name';

  @Input() resourceName: ResourceKey;
  @Input() label: string;

  enteredValue: string

  appStateService: AppStateService;

  constructor(appStateService: AppStateService) {
    this.appStateService = appStateService;
    this.enteredValue = '';
  }

  ngOnInit(): void {
  }

  selectEvent(item) {
    this.appStateService.selectItem(this.resourceName, item);
  }

  resetEvent() {
    this.appStateService.resetItem(this.resourceName);
  }

  isDataLoaded() {
    return this.appStateService.isDataLoaded(this.resourceName);
  }

  getData() {
    return this.appStateService.getData(this.resourceName, this.enteredValue);
  }

  handleChange(value: string) {
    this.enteredValue = value;
  }
}
