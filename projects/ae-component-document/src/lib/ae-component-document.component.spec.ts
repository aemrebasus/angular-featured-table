import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeComponentDocumentComponent } from './ae-component-document.component';

describe('AeComponentDocumentComponent', () => {
  let component: AeComponentDocumentComponent;
  let fixture: ComponentFixture<AeComponentDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeComponentDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeComponentDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
