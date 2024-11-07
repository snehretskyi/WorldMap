import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import {WorldBankService} from './world-bank.service';
import {Categories} from '../models/categories';
import {Observable} from 'rxjs';
import {MapService} from './map.service';

@Injectable({
  providedIn: 'root'
})
export class MapColorService {

  private countryData:any;

  constructor(private worldBankService:WorldBankService,
              private mapService:MapService) { }

  // apply provided color categories based on the data returned via api
  applyColor(mapModeFn:Observable<any>, categories:Categories[], countries:any) {
    mapModeFn.subscribe((data:any) => {
      const dataArray = data[1];
      this.countryData = dataArray.reduce((acc:any, item:any) => {
        acc[item.country.id] = item.value;
        return acc;
      }, {});

      const values:number[] | undefined = Object.values(this.countryData);

      countries.each((d:any, i:number, nodes:any) => {
        const country = d3.select(nodes[i]);
        const countryId = country.attr('id');
        const indicator = this.countryData[countryId];
        const color = indicator
          ? categories.find(category => indicator < category.threshold)?.color!
          : '#ccc';
        country.selectAll('path').attr('fill', color);
      });
    });
  }

  getCountryDataByID(id:string) {
    if (this.countryData) {
      if (typeof this.countryData[id] == "number") {
        if (this.countryData[id] > 1000) {
          const value = Math.round(this.countryData[id]);
          if (value >= 1e9) {
            return `${(value / 1e9).toFixed(1)}B`;
          } else if (value >= 1e6) {
            return `${(value / 1e6).toFixed(1)}M`;
          } else if (value >= 1e3) {
            return `${(value / 1e3).toFixed(1)}K`;
          } else {
            return value.toLocaleString();
          }
        } else {
          return this.countryData[id].toLocaleString();
        }

      } else {
        return this.countryData[id];
      }
    }

    return;
  }

  purgeCountryData() {
    this.countryData = null;
  }
}
