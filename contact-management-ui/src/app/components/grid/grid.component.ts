import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatPaginator,
  PageEvent,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { catchError, debounceTime, switchMap, tap } from 'rxjs/operators';
import { ContactService } from 'src/app/services/contact.service';
import { SearchParams } from 'src/app/models/searchParams';
import { fromEvent, of, pipe } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Contact } from 'src/app/models/contact';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
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

  constructor(private service: ContactService) {}

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
          this.totalItems = response.length;
          this.dataSource.data = response;
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

  deleteElement(id: any) {
    console.log(id);
    this.service.deleteContact(id).subscribe();
    this.fetchData();
  }
  editElement(contact: Contact) {
    this.service.updateContact(contact).subscribe();
    this.fetchData();
  }
}
