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
    const svg = d3.select('svg');
    const mapGroup = d3.select('g#mapGroup');


    if (svg.empty() || mapGroup.empty()) {
      console.error('SVG or map group not found in the DOM');
      return;
    }

    // Define the zoom behavior
    const zoom: ZoomBehavior<any, any> = d3.zoom()
      .scaleExtent([1, 3])
      .on('zoom', (event) => {
        // Apply the zoom transform to the map group
        mapGroup.attr('transform', event.transform);
      });

    const drag: DragBehavior<any, any, any> = d3.drag()
      .on('drag', (event) => {
        // Apply the zoom transform to the map group
        mapGroup.attr('transform', event.transform);
      });

    // Apply zoom behavior to the SVG
    svg.call(zoom, drag);

    svg.on('wheel', (event) => {
      // Prevent the default behavior of the wheel event (like scrolling the page)
      event.preventDefault();
      event.stopPropagation();
      svg.call(zoom);
    });


  }


}
