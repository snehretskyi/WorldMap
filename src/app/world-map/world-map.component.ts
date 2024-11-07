import {Component, HostListener, Input, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';
import {BaseType, DragBehavior, ZoomBehavior} from 'd3';
import {names, political} from '../data/political';
import {continents} from '../data/continents';
import {WorldBankService} from '../services/world-bank.service';
import {MapColorService} from '../services/map-color.service';
import {Categories} from '../models/categories';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-world-map',
  standalone: true,
  imports: [],
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

  public constructor(private worldBankService: WorldBankService,
                     private mapColorService: MapColorService) {
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
        console.log(event.transform);
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
        d3.select((event.currentTarget as HTMLElement)).selectAll('path').attr('stroke', 'red').attr("stroke-width", 2);
      }).on('mouseout', (event: MouseEvent, d: any) => {
      d3.select((event.currentTarget as HTMLElement)).selectAll('path').attr('stroke', 'black').attr("stroke-width", 0.2);
    });
  }

  private getLargestPath(country: d3.Selection<any, any, any, any>): SVGPathElement | null {
    let largestArea = 0;
    let largestPath: SVGPathElement | null = null;

    country.selectAll('path').each(function() {
      const path = this as SVGPathElement;
      const bounds = path.getBBox();
      const area = bounds.width * bounds.height;

      if (area > largestArea) {
        largestArea = area;
        largestPath = path;
      }
    });

    return largestPath;
  }

  changeColor() {
    let categories:Categories[] = [];
    let callback:Observable<any>;

    switch (this.currentMode) {
      case "political": {
        this.countries.each((d:any, i:number, nodes:any) => {
          const country = d3.select(nodes[i]);
          const color = political[country.attr('id')] || d3.interpolateRainbow(Math.random());
          country.selectAll('path').attr('fill', color);

        });

        return;
      } case "continents": {
        const continentColorScale = d3.scaleOrdinal(d3.schemeCategory10);

        this.countries.each((d:any, i:number, nodes:any) => {
          const country = d3.select(nodes[i]);
          const continent = continents[country.attr('id')];
          const color = continentColorScale(continent);
          country.selectAll('path').attr('fill', color);

          const bbox = country.node().getBBox();
        });

        return;
      } case "gdp": {
        categories = [
          { threshold: 1e9, color: '#FF0000' },      // Very Low (Red)
          { threshold: 50e9, color: '#FF4500' },      // Low (Orange-Red)
          { threshold: 1e10, color: '#FF8C00' },      // Lower-Middle (Orange)
          { threshold: 5e10, color: '#FFA500' },     // Middle-Low (Dark Orange)
          { threshold: 1e11, color: '#FFD700' },     // Middle (Gold)
          { threshold: 5e11, color: '#FFFF00' },     // Upper-Middle (Yellow)
          { threshold: 20e11, color: '#37ff00' },     // Very High (Lime Green)
          { threshold: Infinity, color: '#006400' }  // Extremely High (Dark Green) // Highest (Darkest Green)
        ];
        callback = this.worldBankService.getGdp();
        break;
      } case "gdpPerCapita": {
        categories = [
          {threshold: 1000, color: '#FF0000'},      // Very Low (Red)
          {threshold: 5000, color: '#FF4500'},      // Low (Orange-Red)
          {threshold: 10000, color: '#ff8d00'},      // Lower-Middle (Orange)
          {threshold: 15000, color: '#ffd500'},     // Middle-Low (Dark Orange)
          {threshold: 20000, color: '#eeff00'},     // Middle (Gold)
          {threshold: 30000, color: '#d0ff00'},     // Upper-Middle (Yellow)
          {threshold: 40000, color: '#37ff00'},
          {threshold: 70000, color: '#1a8000'},  // Very High (Lime Green)
          {threshold: Infinity, color: '#003e00'}  // Extremely High (Dark Green) // Highest (Darkest Green)
        ];
        callback = this.worldBankService.getGdpPerCapita();
        break;
      } case "gdpPerCapitaPpp": {
        categories = [
          {threshold: 1000, color: '#FF0000'},      // Very Low (Red)
          {threshold: 5000, color: '#FF4500'},      // Low (Orange-Red)
          {threshold: 10000, color: '#ff8d00'},      // Lower-Middle (Orange)
          {threshold: 15000, color: '#ffd500'},     // Middle-Low (Dark Orange)
          {threshold: 20000, color: '#eeff00'},     // Middle (Gold)
          {threshold: 30000, color: '#d0ff00'},     // Upper-Middle (Yellow)
          {threshold: 40000, color: '#37ff00'},
          {threshold: 70000, color: '#1a8000'},  // Very High (Lime Green)
          {threshold: Infinity, color: '#003e00'}  // Extremely High (Dark Green) // Highest (Darkest Green)
        ];
        callback = this.worldBankService.getGdpPerCapitaPpp();
        break;
      } case "population": {
        categories = [
          { threshold: 0, color: '#FF0000' },          // Very Low (Red)
          { threshold: 1e6, color: '#FF4500' },     // Low (Red-Orange)
          { threshold: 2e6, color: '#FF8C00' },        // Lower-Middle (Orange)
          { threshold: 5e6, color: '#FFD700' },        // Middle-Low (Gold)
          { threshold: 10e6, color: '#FFFF00' },       // Moderate (Yellow)
          { threshold: 50e6, color: '#ADFF2F' },       // Higher-Middle (Yellow-Green)
          { threshold: 100e6, color: '#7FFF00' },       // High (Lime)
          { threshold: 200e6, color: '#32CD32' },      // Very High (Green)
          { threshold: 1e9, color: '#006400' },      // Extremely High (Dark Green)
          { threshold: Infinity, color: '#003200' }    // Maximum (Deep Green)
        ];
        callback = this.worldBankService.getPopulation();
        break;
      } case "gdpGrowth": {
        categories = [
          { threshold: 0, color: '#FF0000' },       // Negative Growth (Red)
          { threshold: 1, color: '#FF4500' },       // Low Growth (Orange-Red)
          { threshold: 2, color: '#FF8C00' },       // Moderate Growth (Orange)
          { threshold: 3, color: '#FFD700' },       // Good Growth (Gold)
          { threshold: 4, color: '#FFFF00' },       // High Growth (Yellow)
          { threshold: 5, color: '#ADFF2F' },       // Very High Growth (Yellow-Green)
          { threshold: Infinity, color: '#7FFF00' } // Extremely High Growth (Lime)
        ];
        callback = this.worldBankService.getGdpGrowth();
        break;
      } case "gdpPppGrowth": {
        categories = [
          { threshold: 0, color: '#FF0000' },       // Negative Growth (Red)
          { threshold: 1, color: '#FF4500' },       // Low Growth (Orange-Red)
          { threshold: 2, color: '#FF8C00' },       // Moderate Growth (Orange)
          { threshold: 3, color: '#FFD700' },       // Good Growth (Gold)
          { threshold: 4, color: '#FFFF00' },       // High Growth (Yellow)
          { threshold: 5, color: '#ADFF2F' },       // Very High Growth (Yellow-Green)
          { threshold: Infinity, color: '#7FFF00' } // Extremely High Growth (Lime)
        ];
        callback = this.worldBankService.getGdpPppGrowth();
        break;
      } case "inflation": {
        categories = [
          { threshold: 0, color: '#7FFF00' },       // Low Inflation (Lime)
          { threshold: 2, color: '#ADFF2F' },       // Moderate Inflation (Yellow-Green)
          { threshold: 4, color: '#FFFF00' },       // High Inflation (Yellow)
          { threshold: 6, color: '#FFD700' },       // Very High Inflation (Gold)
          { threshold: 8, color: '#FF8C00' },       // Extremely High Inflation (Orange)
          { threshold: 10, color: '#FF4500' },      // Hyperinflation (Orange-Red)
          { threshold: Infinity, color: '#FF0000' } // Severe Hyperinflation (Red)
        ];
        callback = this.worldBankService.getInflation();
        break;
      } case "unemployment": {
        categories = [
          { threshold: 2, color: '#7FFF00' },       // Very Low (Lime)
          { threshold: 4, color: '#ADFF2F' },       // Low (Yellow-Green)
          { threshold: 6, color: '#FFFF00' },       // Moderate (Yellow)
          { threshold: 8, color: '#FFD700' },       // High (Gold)
          { threshold: 10, color: '#FF8C00' },      // Very High (Orange)
          { threshold: 12, color: '#FF4500' },      // Extremely High (Orange-Red)
          { threshold: Infinity, color: '#FF0000' } // Severe (Red)
        ];
        callback = this.worldBankService.getUnemployment();
        break;
      } case "migration": {
        categories = [
          { threshold: -1000000, color: '#FF0000' }, // Very High Emigration (Red)
          { threshold: -500000, color: '#FF4500' },  // High Emigration (Orange-Red)
          { threshold: -100000, color: '#FF8C00' },  // Moderate Emigration (Orange)
          { threshold: 0, color: '#FFD700' },        // Low Emigration (Gold)
          { threshold: 100000, color: '#FFFF00' },   // Low Immigration (Yellow)
          { threshold: 500000, color: '#ADFF2F' },   // Moderate Immigration (Yellow-Green)
          { threshold: 1000000, color: '#7FFF00' },  // High Immigration (Lime)
          { threshold: Infinity, color: '#32CD32' }  // Very High Immigration (Green)
        ];
        callback = this.worldBankService.getMigration();
        break;
      } case "fertility": {
        categories = [
          { threshold: 1, color: '#FF0000' },       // Very Low (Red)
          { threshold: 1.5, color: '#FF4500' },     // Low (Orange-Red)
          { threshold: 2, color: '#FF8C00' },       // Moderate (Orange)
          { threshold: 3, color: '#FFD700' },       // High (Gold)
          { threshold: 4, color: '#ADFF2F' },       // Very High (Yellow-Green)
          { threshold: 5, color: '#7FFF00' },       // Extremely High (Lime)
          { threshold: 6, color: '#32CD32' },       // Maximum (Green)
          { threshold: Infinity, color: '#006400' } // Maximum (Dark Green)
        ];
        callback = this.worldBankService.getFertility();
        break;
      } case "populationDensity": {
        categories = [
          { threshold: 5, color: '#FF0000' },      // Very Low (Red)
          { threshold: 20, color: '#FF8C00' },     // Low (Orange-Red)
          { threshold: 100, color: '#FFD700' },    // Moderate (Gold)
          { threshold: 250, color: '#a8ea22' },    // High (Yellow-Green)
          { threshold: 500, color: '#57EC01' },    // Very High (Bright Green)
          { threshold: 1000, color: '#32CD32' },   // Extremely High (Lime Green)
          { threshold: Infinity, color: '#006400' } // Maximum (Dark Green)
        ];
        callback = this.worldBankService.getPopulationDensity();
        break;
      } default: {
        this.mapGroup.selectAll('g').selectAll('path').attr('fill', 'white');
        this.mapGroup.selectAll('.country-label').remove();
        return;
      }
    }

    this.mapColorService.applyColor(callback, categories, this.countries);
  }

  ngOnChanges() {
    // returning early if the mapGroup is empty
    if (!this.mapGroup) {
      return;
    }

    this.changeColor();
  }
}
