import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeTextContentComponent } from './ae-text-content.component';

describe('AeTextContentComponent', () => {
  let component: AeTextContentComponent;
  let fixture: ComponentFixture<AeTextContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeTextContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeTextContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
