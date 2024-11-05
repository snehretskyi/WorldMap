import {Component, HostListener, Input, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';
import {DragBehavior, ZoomBehavior} from 'd3';
import {names, political} from '../data/political';
import {continents} from '../data/continents';

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

  ngAfterViewInit() {
    // finding elements only AFTER the view has been initialized
    this.svg = d3.select('svg');
    this.mapGroup = d3.select('g#mapGroup');

    if (this.mapGroup.empty()) {
      console.error('SVG or map group not found in the DOM');
      return;
    }

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
    if (this.currentMode == "political") {
      const countries = this.mapGroup.selectAll('g');

      // First remove all existing labels
      this.mapGroup.selectAll('.country-label').remove();

      countries.each((d:any, i:number, nodes:any) => {
        const country = d3.select(nodes[i]);
        const color = political[country.attr('id')] || d3.interpolateRainbow(Math.random());
        country.selectAll('path').attr('fill', color);

        const bbox = country.node().getBBox();
        if (bbox.width * bbox.height > 100) {
          const path = this.getLargestPath(country);
          if (path) {
            const centroid = path.getPointAtLength(path.getTotalLength() / 2);

            country.append('text')
              .attr('class', 'country-label')
              .attr('x', centroid.x)
              .attr('y', centroid.y)
              .attr('text-anchor', 'middle')
              .attr('dominant-baseline', 'middle')
              .style('font-size', '10px')
              .style('pointer-events', 'none')
              .text(names[country.attr('id')] || country.attr('id'));
          }
        }
      });
    } else if (this.currentMode == "continents") {
      const continentColorScale = d3.scaleOrdinal(d3.schemeCategory10);
      const countries = this.mapGroup.selectAll('g');

      // First remove all existing labels
      this.mapGroup.selectAll('.country-label').remove();

      countries.each((d:any, i:number, nodes:any) => {
        const country = d3.select(nodes[i]);
        const continent = continents[country.attr('id')];
        const color = continentColorScale(continent);
        country.selectAll('path').attr('fill', color);

        const bbox = country.node().getBBox();
        if (bbox.width * bbox.height > 100) {
          const path = this.getLargestPath(country);
          if (path) {
            const centroid = path.getPointAtLength(path.getTotalLength() / 2);

            country.append('text')
              .attr('class', 'country-label')
              .attr('x', centroid.x)
              .attr('y', centroid.y)
              .attr('text-anchor', 'middle')
              .attr('dominant-baseline', 'middle')
              .style('font-size', '10px')
              .style('pointer-events', 'none')
              .text(names[country.attr('id')] || country.attr('id'));
          }
        }
      });
    } else {
      this.mapGroup.selectAll('g').selectAll('path').attr('fill', 'white');
      this.mapGroup.selectAll('.country-label').remove();
    }
  }



  ngOnChanges() {
    console.log(this.currentMode)
    this.changeColor();
  }
}
