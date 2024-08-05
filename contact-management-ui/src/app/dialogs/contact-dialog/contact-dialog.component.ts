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
    this.contactForm = this.fb.group({
      id: [data.contact?.id || 0],
      firstname: [data.contact?.firstName || '', Validators.required],
      lastname: [data.contact?.lastName || '', Validators.required],
      email: [
        data.contact?.email || '',
        [Validators.required, Validators.email],
      ],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      let contact: Contact = {
        id: this.contactForm.get('id')?.value || 0,
        firstName: this.contactForm.get('firstname')?.value || '',
        lastName: this.contactForm.get('lastname')?.value || '',
        email: this.contactForm.get('email')?.value || '',
      };
      //Update Contact
      if (this.data.contact != null) {
        this.service.updateContact(contact).subscribe();
      }
      //Add Contact
      else {
        this.service.createContact(contact).subscribe();
      }
      this.dialogRef.close(this.contactForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
