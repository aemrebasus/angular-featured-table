import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeDynamicTableComponent } from './ae-dynamic-table.component';

describe('AeDynamicTableComponent', () => {
  let component: AeDynamicTableComponent;
  let fixture: ComponentFixture<AeDynamicTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeDynamicTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeDynamicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
