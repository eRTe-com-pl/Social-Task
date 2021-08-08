import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobeDemoPageComponent } from './globe-demo-page.component';

describe('GlobeDemoPageComponent', () => {
  let component: GlobeDemoPageComponent;
  let fixture: ComponentFixture<GlobeDemoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobeDemoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobeDemoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
