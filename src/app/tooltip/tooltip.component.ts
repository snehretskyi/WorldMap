import {Component, Input} from '@angular/core';
import {CountryData} from '../models/country-data';
import {WorldMapComponent} from '../world-map/world-map.component';
import {MapService} from '../services/map.service';
import {NgIf} from '@angular/common';
import {async} from 'rxjs';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css'
})
export class TooltipComponent {
  @Input() countryData?: any;
  @Input() countries?:any;

  constructor(private mapService: MapService) {

  }

}
