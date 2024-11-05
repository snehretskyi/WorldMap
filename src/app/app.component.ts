import {Component, Input} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WorldMapComponent} from './world-map/world-map.component';
import {MapModeComponent} from './map-mode/map-mode.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorldMapComponent, MapModeComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WorldMap';
  @Input() mapMode?: any = 'political';

  changeMode($event: string) {
    this.mapMode = $event;
  }
}
