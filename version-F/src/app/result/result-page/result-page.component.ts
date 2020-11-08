import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AppStateService } from '../../services/app-state.service';
import { PlotService } from '../../services/plot-service';
import { Plot } from '../../services/types';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ResultPageComponent implements OnInit {

  appStateService: AppStateService;
  plotService: PlotService;

  plot: Plot;
  usedResources: string[];

  constructor(appStateService: AppStateService, plotService: PlotService) {
    this.appStateService = appStateService;
    this.plotService = plotService;
  }

  private generatePlot() {
    const selectedItems = this.appStateService.getSelectedItems();
    this.plot = this.plotService.generatePlot(...(selectedItems.map(i => i.value.name) as [string, string, string?, string?, string?]));
    this.usedResources = selectedItems.map(s => s.value.url);
  }

  resetSelectedItems() {
    this.appStateService.resetSelectedItems();
  }

  ngOnInit(): void {
    this.generatePlot();
  }
}
