import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationBoxDialogComponent } from './confirmation-box-dialog.component';

describe('ConfirmationBoxDialogComponent', () => {
  let component: ConfirmationBoxDialogComponent;
  let fixture: ComponentFixture<ConfirmationBoxDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationBoxDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmationBoxDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
