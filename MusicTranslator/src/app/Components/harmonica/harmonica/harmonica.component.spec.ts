import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarmonicaComponent } from './harmonica.component';

describe('HarmonicaComponent', () => {
  let component: HarmonicaComponent;
  let fixture: ComponentFixture<HarmonicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HarmonicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarmonicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
