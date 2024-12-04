import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatLegendEntry',
  standalone: true
})
export class FormatLegendEntryPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (value >= 1000) {
      let formattedValue = Math.round(value);
      if (formattedValue >= 1e9) {
        return `${(formattedValue / 1e9).toFixed(1)}B`;
      } else if (formattedValue >= 1e6) {
        return `${(formattedValue / 1e6).toFixed(1)}M`;
      } else if (formattedValue >= 1e3) {
        return `${(formattedValue / 1e3).toFixed(1)}K`;
      } else {
        return formattedValue.toLocaleString();
      }
    } else {
      return `${value.toLocaleString()}`;
    }
  }

}
