import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-confirmation-box-dialog',
  templateUrl: './confirmation-box-dialog.component.html',
  styleUrls: ['./confirmation-box-dialog.component.css'],
})
export class ConfirmationBoxDialogComponent {
  constructor(
    private service: ContactService,
    public dialogRef: MatDialogRef<ConfirmationBoxDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete() {
    this.service
      .deleteContact(this.data.id)
      .subscribe(() => this.dialogRef.close(true));
  }
}
