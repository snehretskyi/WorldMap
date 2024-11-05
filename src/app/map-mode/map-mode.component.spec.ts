import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapModeComponent } from './map-mode.component';

describe('MapModeComponent', () => {
  let component: MapModeComponent;
  let fixture: ComponentFixture<MapModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapModeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
