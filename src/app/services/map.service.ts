import { Injectable } from '@angular/core';
import {names} from '../data/political';
import {Observable, of} from 'rxjs';
import {CountryData} from '../models/country-data';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private hoveredCountryData: any;

  constructor() { }

  getHoveredCountryData(): CountryData {
    return this.hoveredCountryData;
  }

  setHoveredCountryData(value: CountryData | null) {
    this.hoveredCountryData = value;
  }

  idToName(id:string) {
    return names[id];
  }
}
