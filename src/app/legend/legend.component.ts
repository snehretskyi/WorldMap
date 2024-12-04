import {Component, Input} from '@angular/core';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {Categories} from '../models/categories';
import {FormatLegendEntryPipe} from '../pipes/format-legend-entry.pipe';
import {CategoriesGroup} from '../models/categories-group';

@Component({
  selector: 'app-legend',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DecimalPipe,
    FormatLegendEntryPipe
  ],
  templateUrl: './legend.component.html',
  styleUrl: './legend.component.css'
})
export class LegendComponent {
  @Input() categories?: CategoriesGroup;

  protected readonly Infinity = Infinity;
}
