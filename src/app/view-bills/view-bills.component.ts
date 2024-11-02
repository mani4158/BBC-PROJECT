import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/invoice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../Auth/auth-service.service';

@Component({
  selector: 'app-view-bills',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './view-bills.component.html',
  styleUrls: ['./view-bills.component.css']
})
export class ViewBillsComponent implements OnInit {
  customerId: any = ''; 
  invoices: Invoice[] = [];
  filteredInvoices: Invoice[] = [];
  errorMessage: string = '';

  constructor(
    private invoiceService: InvoiceService, 
    private router: Router,
    private route: ActivatedRoute,
    private Auth:AuthServiceService
  ) { }

  ngOnInit(): void {
    if(this.Auth.getCustomerId() === null){
      this.router.navigate(["/Emp-login"])
    }
    this.customerId = ''; 
    this.route.params.subscribe(() => {
      this.getAllUnpaidInvoices();
    });
  }
  getAllUnpaidInvoices() {
    this.invoiceService.getAllInvoices().subscribe(
      (data) => {
        this.invoices = data;
        this.filterUnpaidInvoices(data);
      },
      (error) => {
        this.errorMessage = 'No invoices found for this Customer ID.Failed to load invoices.';
      }
    );
  }

  getInvoices() {
    this.errorMessage = ''; 
    if (this.customerId) {
      this.invoiceService.getInvoicesByCustomerId(this.customerId).subscribe(
        (data) => {
          if (data.length === 0) {
            this.errorMessage = 'No invoices found for this Customer ID.';
            this.filteredInvoices = [];
          } else {
            this.filterUnpaidInvoices(data);
            this.errorMessage = ''; 
          }
        },
        (error) => {
          this.errorMessage = 'Failed to load invoices for this Customer ID.';
          this.filteredInvoices = [];
        }
      );
    } else {
      this.filterUnpaidInvoices(this.invoices);
    }
  }

  private filterUnpaidInvoices(invoices: Invoice[]) {
    console.log(invoices)
    this.filteredInvoices = invoices.filter(invoice => !invoice.amountStatus);
  }
  
  goToPayment(invoiceId: number, custId: string) {
    this.router.navigate(['/dashboard/manual-Payment'], {
      queryParams: {  invoiceId: invoiceId }
    });
  }
}
