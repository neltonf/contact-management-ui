import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.css'],
})
export class ContactDialogComponent {
  contactForm: FormGroup;

  constructor(
    private service: ContactService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data.contact);

    this.contactForm = this.fb.group({
      id: [data.contact.id || '', Validators.required],
      firstname: [data.contact.firstName || '', Validators.required],
      lastname: [data.contact.lastName || '', Validators.required],
      email: [
        data.contact.email || '',
        [Validators.required, Validators.email],
      ],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      //Update Contact
      if (this.data.contact != null) {
        this.service
          .updateContact({
            id: this.contactForm.get('id')?.value,
            firstName: this.contactForm.get('firstname')?.value,
            lastName: this.contactForm.get('lastname')?.value,
            email: this.contactForm.get('email')?.value,
          })
          .subscribe();
      }
      //Add Contact
      else {
      }
      this.dialogRef.close(this.contactForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
