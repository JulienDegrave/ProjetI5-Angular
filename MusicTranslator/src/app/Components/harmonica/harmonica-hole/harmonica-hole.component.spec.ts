import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarmonicaHoleComponent } from './harmonica-hole.component';

describe('HarmonicaHoleComponent', () => {
  let component: HarmonicaHoleComponent;
  let fixture: ComponentFixture<HarmonicaHoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HarmonicaHoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarmonicaHoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
