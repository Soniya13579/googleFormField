import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillFormDialogComponent } from './fill-form-dialog.component';

describe('FillFormDialogComponent', () => {
  let component: FillFormDialogComponent;
  let fixture: ComponentFixture<FillFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FillFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
