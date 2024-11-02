import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8080/payments/transactions/customer';

  constructor(private http: HttpClient) { }

  getTransactionsByCustomerId(customerId: string): Observable<any> {
    console.log("hii")
    return this.http.get(`${this.apiUrl}/${customerId}`);
  }
  downloadInvoice(invoiceId: number): Observable<Blob> {
    return this.http.get(`http://localhost:8080/api/invoices/download/${invoiceId}`, { responseType: 'blob' });
  }
}
