import { Component } from '@angular/core';
import { AppStateService } from './services/app-state.service';
import { ResourceService } from './services/resource.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppStateService, ResourceService]
})
export class AppComponent {
  title = 'starwars-plot-generator';
}
