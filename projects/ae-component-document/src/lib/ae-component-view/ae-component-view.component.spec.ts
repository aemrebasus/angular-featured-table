import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeComponentViewComponent } from './ae-component-view.component';

describe('AeComponentViewComponent', () => {
  let component: AeComponentViewComponent;
  let fixture: ComponentFixture<AeComponentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeComponentViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeComponentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
