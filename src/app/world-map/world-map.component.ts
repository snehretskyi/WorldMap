import {Component, HostListener} from '@angular/core';
import * as d3 from 'd3';
import {DragBehavior, ZoomBehavior} from 'd3';

@Component({
  selector: 'app-world-map',
  standalone: true,
  imports: [],
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.css'
})
export class WorldMapComponent {

  ngAfterViewInit() {
    const body = d3.select('body');
    const svg = d3.select('svg');
    const mapGroup = d3.select('g#mapGroup');


    if (svg.empty() || mapGroup.empty()) {
      console.error('SVG or map group not found in the DOM');
      return;
    }

    // Define the zoom behavior
    const zoom: ZoomBehavior<any, any> = d3.zoom()
      .scaleExtent([1, 10])
      .on('zoom', (event) => {
        console.log(event.transform);
        // Apply the zoom transform to the map group
        mapGroup.attr('transform', event.transform);
      });

    const drag: DragBehavior<any, any, any> = d3.drag()
      .on('drag', (event) => {
        // Apply the zoom transform to the map group
        mapGroup.attr('transform', event.transform);
      });

    body.call(zoom, drag);

    body.on('wheel', (event) => {
      // Prevent the default behavior of the wheel event (like scrolling the page)
      event.preventDefault();
      event.stopPropagation();
      svg.call(zoom);
    });

    mapGroup.selectAll('g')
      .on('mouseover', (event: MouseEvent, d: any) => {
        d3.select((event.currentTarget as HTMLElement)).selectAll('path').attr('stroke', 'red').attr("stroke-width", 2);
      }).on('mouseout', (event: MouseEvent, d: any) => {
      d3.select((event.currentTarget as HTMLElement)).selectAll('path').attr('stroke', 'black').attr("stroke-width", 0.2);
    });
  }


}
