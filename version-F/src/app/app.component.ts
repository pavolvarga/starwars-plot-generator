import { Component } from '@angular/core';
import { AppStateService } from './services/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppStateService]
})
export class AppComponent {
  title = 'starwars-plot-generator';
}
