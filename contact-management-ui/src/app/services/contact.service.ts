import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'https://localhost:7200/Contact';

  constructor(private http: HttpClient) {}

  // Get a specific contact by ID
  getContact(searchParams: any): Observable<any> {
    let params = new HttpParams();
    for (let key in searchParams) {
      if (searchParams.hasOwnProperty(key)) {
        params = params.set(key, searchParams[key]);
      }
    }

    return this.http.get<Contact[]>(this.apiUrl, { params });
  }

  // Create a new contact
  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  // Update an existing contact
  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}?id=${contact.id}`, contact);
  }

  // Delete a contact
  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`);
  }
}
