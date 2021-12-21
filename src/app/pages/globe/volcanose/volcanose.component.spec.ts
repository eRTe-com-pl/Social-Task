import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolcanoseComponent } from './volcanose.component';

describe('VolcanoseComponent', () => {
  let component: VolcanoseComponent;
  let fixture: ComponentFixture<VolcanoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolcanoseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolcanoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
