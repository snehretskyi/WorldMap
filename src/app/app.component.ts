import {Component, Input} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WorldMapComponent} from './world-map/world-map.component';
import {MapModeComponent} from './map-mode/map-mode.component';
import {FormsModule} from '@angular/forms';
import {TooltipComponent} from './tooltip/tooltip.component';
import {MapService} from './services/map.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorldMapComponent, MapModeComponent, FormsModule, TooltipComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WorldMap';
  @Input() mapMode?: any = 'political';
  hoveredCountryData: any;

  constructor(private mapService: MapService) {
  }

  changeMode($event: string) {
    this.mapMode = $event;
  }

  updateTooltip() {
   this.hoveredCountryData = this.mapService.getHoveredCountryData();
   console.log(this.hoveredCountryData)
  }
}
