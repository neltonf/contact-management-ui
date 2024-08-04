import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { ContactService } from 'src/app/services/contact.service';
import { SearchParams } from 'src/app/models/searchParams';
import { Contact } from 'src/app/models/contact';
import { ContactDialogComponent } from 'src/app/dialogs/contact-dialog/contact-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
          this.totalItems = 100;
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
    this.searchQuery = value.trim().toLowerCase();
    this.pageIndex = 0;
    this.fetchData();
  }

  addContact() {
    this.openContactDialog();
  }

  deleteContact(id: any) {
    this.service.deleteContact(id).subscribe();
    this.fetchData();
  }
  editContact(contact: Contact) {
    this.openContactDialog(contact);
  }

  openContactDialog(contact: Contact | null = null): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '400px',
      data: { contact: contact },
    });

    dialogRef.afterClosed().subscribe((result: Contact | undefined) => {
      if (result) {
        this.fetchData();
      }
    });
  }
}
