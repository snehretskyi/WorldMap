import {Component, EventEmitter, HostListener, Input, Output, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';
import {BaseType, DragBehavior, ZoomBehavior} from 'd3';
import {names, political} from '../data/political';
import {continents} from '../data/continents';
import {WorldBankService} from '../services/world-bank.service';
import {MapColorService} from '../services/map-color.service';
import {Categories} from '../models/categories';
import {Observable} from 'rxjs';
import {MapService} from '../services/map.service';
import {CountryData} from '../models/country-data';
import {LegendComponent} from '../legend/legend.component';
import {CategoriesGroup} from '../models/categories-group';
import {
  employmentCategories,
  fertilityCategories,
  gdpCategories,
  gdpGrowthCategories,
  gdpPerCapitaCategories,
  gdpPerCapitaPppCategories,
  gdpPppGrowthCategories,
  inflationCategories,
  migrationCategories,
  populationCategories,
  populationDensityCategories
} from '../data/categories';

@Component({
  selector: 'app-world-map',
  standalone: true,
  imports: [
    LegendComponent
  ],
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.css',
  // very very hacky, but taping d3 into angular is also not very elegant
  encapsulation: ViewEncapsulation.None
})
export class WorldMapComponent {
  @Input() currentMode:string = 'political';
  private mapGroup:any;
  private svg:any;
  private countries:any;
  private data?:CountryData;
  public categories?:CategoriesGroup;

  public constructor(private worldBankService: WorldBankService,
                     private mapColorService: MapColorService,
                     private mapServiceService: MapService) {
  }

  ngAfterViewInit() {
    // finding elements only AFTER the view has been initialized
    this.svg = d3.select('svg');
    this.mapGroup = d3.select('g#mapGroup');

    this.countries = this.mapGroup.selectAll('g')
    this.changeColor();

    // Define the zoom behavior
    const zoom: ZoomBehavior<any, any> = d3.zoom()
      .scaleExtent([1, 10])
      .on('zoom', (event) => {
        this.mapGroup.attr('transform', event.transform);
      });

    const drag: DragBehavior<any, any, any> = d3.drag()
      .on('drag', (event) => {
        // Apply the zoom transform to the map group
        this.mapGroup.attr('transform', event.transform);
      });

    this.mapGroup.call(zoom);
    this.mapGroup.call(drag);

    this.mapGroup.on('wheel', (event:MouseEvent) => {
      // Prevent the default behavior of the wheel event (like scrolling the page)
      event.preventDefault();
      event.stopPropagation();
      this.svg.call(zoom);
    });

    this.mapGroup.selectAll('g')
      .on('mouseover', (event: MouseEvent, d: any) => {
        const country = d3.select((event.currentTarget as HTMLElement));
        const countryIndicatorValue:unknown = this.mapColorService.getCountryDataByID(country.attr('id'));

        // check if there is a data to display
        if (countryIndicatorValue) {
          this.data = {
            name: this.mapServiceService.idToName(country.attr('id')),
            value: this.mapColorService.getCountryDataByID(country.attr('id'))
          };
        } else {
          this.data = {
            name: this.mapServiceService.idToName(country.attr('id'))
          }
        }
        this.mapServiceService.setHoveredCountryData(this.data);
        country.selectAll('path').attr('stroke', 'red').attr("stroke-width", 2);
      }).on('mouseout', (event: MouseEvent, d: any) => {
      d3.select((event.currentTarget as HTMLElement)).selectAll('path').attr('stroke', 'black').attr("stroke-width", 0.2);
      // cleaning up after mouseout
      const data = null;
      this.mapServiceService.setHoveredCountryData(data);
    });
  }

  changeColor() {
    let callback:Observable<any>;
    switch (this.currentMode) {
      case "political": {
        // purging the categories so legend goes away
        this.categories = undefined;

        this.countries.each((d:any, i:number, nodes:any) => {
          const country = d3.select(nodes[i]);
          const color = political[country.attr('id')] || d3.interpolateRainbow(Math.random());
          country.selectAll('path').attr('fill', color);

        });

        this.mapColorService.purgeCountryData();
        return;
      } case "continents": {
        // purging the categories so legend goes away
        this.categories = undefined;
        const continentColorScale = d3.scaleOrdinal(d3.schemeCategory10);

        this.countries.each((d:any, i:number, nodes:any) => {
          const country = d3.select(nodes[i]);
          const continent = continents[country.attr('id')];
          const color = continentColorScale(continent);
          country.selectAll('path').attr('fill', color);

          const bbox = country.node().getBBox();
        });

        this.mapColorService.purgeCountryData();

        return;
      } case "gdp": {
        this.categories = gdpCategories;
        callback = this.worldBankService.getGdp();
        break;
      } case "gdpPerCapita": {
        this.categories = gdpPerCapitaCategories;
        callback = this.worldBankService.getGdpPerCapita();
        break;
      } case "gdpPerCapitaPpp": {
        this.categories = gdpPerCapitaPppCategories;
        callback = this.worldBankService.getGdpPerCapitaPpp();
        break;
      } case "population": {
        this.categories = populationCategories;
        callback = this.worldBankService.getPopulation();
        break;
      } case "gdpGrowth": {
        this.categories = gdpGrowthCategories
        callback = this.worldBankService.getGdpGrowth();
        break;
      } case "gdpPppGrowth": {
        this.categories = gdpPppGrowthCategories;
        callback = this.worldBankService.getGdpPppGrowth();
        break;
      } case "inflation": {
        this.categories = inflationCategories;
        callback = this.worldBankService.getInflation();
        break;
      } case "unemployment": {
        this.categories = employmentCategories;
        callback = this.worldBankService.getUnemployment();
        break;
      } case "migration": {
        this.categories = migrationCategories;
        callback = this.worldBankService.getMigration();
        break;
      } case "fertility": {
        this.categories = fertilityCategories;
        callback = this.worldBankService.getFertility();
        break;
      } case "populationDensity": {
        this.categories = populationDensityCategories;
        callback = this.worldBankService.getPopulationDensity();
        break;
      } default: {
        this.mapGroup.selectAll('g').selectAll('path').attr('fill', 'white');
        this.mapGroup.selectAll('.country-label').remove();
        return;
      }
    }

    this.mapColorService.applyColor(callback, this.categories, this.countries);
  }

  ngOnChanges() {
    // returning early if the mapGroup is empty
    if (!this.mapGroup) {
      return;
    }

    this.changeColor();
  }
}
