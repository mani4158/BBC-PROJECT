import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
    private apiUrl = 'http://localhost:8080/api/customers';
    constructor(private http: HttpClient) {}
    saveCustomer(customer: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/add`, customer);
    }
    bulkUploadCustomers(file: File): Observable<any> {
      const formData: FormData = new FormData();
      formData.append('file', file);
  
      return this.http.post(`${this.apiUrl}/bulk-upload`, formData, { responseType: 'text' });
    }
  }

