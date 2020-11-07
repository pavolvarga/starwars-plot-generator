import { Component, OnInit } from '@angular/core';

import { AppStateService } from '../../services/app-state.service';
import { PlotService } from '../../services/plot-service';
import { generatePlot } from '../../../../../version-E/src/pages/result/plotGenerator';
import { Plot } from '../../services/types';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
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
    this.plot = generatePlot(...(selectedItems.map(i => i.name) as [string, string, string?, string?, string?]));
    this.usedResources = selectedItems.map(s => s.value.url);
  }

  ngOnInit(): void {
    this.generatePlot();
  }
}
