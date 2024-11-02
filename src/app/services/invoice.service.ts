import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private baseUrl = 'http://localhost:8080/api/invoices'; // Backend API
 private base1Url="http://localhost:8080/payments/manual-payment";
  constructor(private http: HttpClient) { }

  getInvoicesByCustomerId(customerId: any): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.baseUrl}/customer/${customerId}`);
  }
  getInvoiceById(invoiceId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/invoice/${invoiceId}`);
  }
  getAllInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.baseUrl}/all`);
  }
  makePayment(invoice_id1: any): Observable<any> { 
    return this.http.post<any>(`${this.base1Url}`,null,{
      params:{
        invoice_Id  : invoice_id1,
        paymentMethod : "CASH"
      }
    });
  }
}
