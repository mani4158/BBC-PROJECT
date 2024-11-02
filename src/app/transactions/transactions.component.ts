import { Component } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthServiceService } from '../Auth/auth-service.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'] 
})
export class TransactionsComponent {
  customerId: string = ''; 
  displayedCustomerId: string = ''; 
  transactions: any[] = [];
  searchPerformed: boolean = false; 

  constructor(private transactionService: TransactionService, private route:Router,private Auth:AuthServiceService) {
    if(this.Auth.getCustomerId() === null){
      this.route.navigate(["/Emp-login"])
    }
  }

  fetchTransactions(event: Event) {
    event.preventDefault();
    this.searchPerformed = true; 
    this.displayedCustomerId = this.customerId;
    this.transactionService.getTransactionsByCustomerId(this.customerId)
      .subscribe((response: any[]) => {
        this.transactions = response;
      });
  }

  downloadInvoice(invoiceId: number) {
    this.transactionService.downloadInvoice(invoiceId).subscribe((response) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice_${invoiceId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
  resetSearch() {
    this.customerId = ''; 
    this.transactions = []; 
    this.searchPerformed = false; 
    this.displayedCustomerId = ''; 
  }
}
