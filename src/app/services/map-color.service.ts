import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import {WorldBankService} from './world-bank.service';
import {Categories} from '../models/categories';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapColorService {

  constructor(private worldBankService:WorldBankService) { }

  // apply provided color categories based on the data returned via api
  applyColor(mapModeFn:Observable<any>, categories:Categories[], countries:any) {
    mapModeFn.subscribe((data:any) => {
      const dataArray = data[1];
      const countryData = dataArray.reduce((acc:any, item:any) => {
        acc[item.country.id] = item.value;
        return acc;
      }, {});

      const values:number[] | undefined = Object.values(countryData);

      countries.each((d:any, i:number, nodes:any) => {
        const country = d3.select(nodes[i]);
        const countryId = country.attr('id');
        const indicator = countryData[countryId];
        const color = indicator
          ? categories.find(category => indicator < category.threshold)?.color!
          : '#ccc';
        country.selectAll('path').attr('fill', color);
      });
    });
  }
}
