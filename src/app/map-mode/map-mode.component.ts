import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-map-mode',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './map-mode.component.html',
  styleUrl: './map-mode.component.css'
})
export class MapModeComponent {
  @Output() selectedModeChange = new EventEmitter<string>();
  selectedMode: string = 'political';

  changeMode() {
      console.log('Changing mode');
    this.selectedModeChange.emit(this.selectedMode);
  }
}
