import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ContactService } from 'src/app/services/contact.service';
import { SearchParams } from 'src/app/models/searchParams';
import { Contact } from 'src/app/models/contact';
import { ContactDialogComponent } from 'src/app/dialogs/contact-dialog/contact-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { ConfirmationBoxDialogComponent } from 'src/app/dialogs/confirmation-box-dialog/confirmation-box-dialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent {
  searchControl = new FormControl('');
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;
  searchQuery: string = '';

  constructor(private service: ContactService, private dialog: MatDialog) {}

  ngOnInit() {
    this.fetchData();

    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (value) => {
          this.applyFilter(value);
        },
      });
  }

  fetchData() {
    const params: SearchParams = {
      page: this.pageIndex.toString(),
      size: this.pageSize.toString(),
      search: this.searchQuery, // Add the search query to the parameters
    };

    this.service
      .getContact(params)
      .pipe(
        tap((response) => {
          this.totalItems = response.length;
          this.dataSource.data = response.data;
        })
      )
      .subscribe();
  }

  pageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData();
  }

  applyFilter(value: any) {
    this.searchQuery = value.trim();
    this.pageIndex = 0;
    this.fetchData();
  }

  addContact() {
    this.openContactDialog();
  }

  deleteContact(id: any) {
    this.openDeleteConfirmationDialog(id);
  }

  editContact(contact: Contact) {
    this.openContactDialog(contact);
  }

  openDeleteConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationBoxDialogComponent, {
      width: '400px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.fetchData();
      }
    });
  }

  openContactDialog(contact: Contact | null = null): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '400px',
      data: { contact: contact },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.fetchData();
      }
    });
  }
}
