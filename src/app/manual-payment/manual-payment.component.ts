import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';  
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../Auth/auth-service.service';

@Component({
  selector: 'app-manual-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manual-payment.component.html',
  styleUrls: ['./manual-payment.component.css']
})
export class ManualPaymentComponent implements OnInit {
  
  customerId!: string; 
  invoiceId!: number; 
  invoice: any;
  discount: number = 0;
  totalAmount: number = 0;
  finalAmount: number = 0;
  isDiscountApplied: boolean = false;
  successMessage: string = '';
  
  custId: string = '';
  custName: string = '';
  custEmail: string = '';
  custPhone: string = '';
  unitsConsumed: number = 0;
  startDate: string = '';
  endDate: string = '';
  dueDate: string = '';
  paymentMethod: string = '';
  payDate: string | null = null;
  amountStatus: boolean = false;
  earlyDiscount: number = 0;
  onlinePaymentDiscount: number = 0;
  finalInvoiceAmount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private Auth:AuthServiceService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    if(this.Auth.getCustomerId() === null){
      this.router.navigate(["/Emp-login"])
    }
    this.route.queryParams.subscribe((params) => {
      this.customerId = params['customerId'];
      this.invoiceId = +params['invoiceId'];
    });

    this.fetchInvoiceDetails();
  }
  currentDate: Date = new Date();
  fetchInvoiceDetails() {
    this.invoiceService.getInvoiceById(this.invoiceId).subscribe((invoice) => {
      this.invoice = invoice;
      console.log('Invoice Data:', invoice);
      this.custId = invoice.customer.custId;
      this.custName = invoice.customer.name;
      this.custEmail = invoice.customer.email;
      this.custPhone = invoice.customer.phoneNumber;
      this.unitsConsumed = invoice.unitsConsumed;
      this.startDate = invoice.startDate;
      this.endDate = invoice.endDate;
      this.totalAmount = invoice.totalAmount;
      this.dueDate = invoice.dueDate;
      this.paymentMethod = invoice.paymentMethod;
      this.payDate = invoice.payDate;
      this.amountStatus = invoice.amountStatus;
      this.earlyDiscount = invoice.earlyDiscount;
      this.onlinePaymentDiscount = invoice.online_payment_Discount;
      this.finalInvoiceAmount = invoice.final_Amount;

      const today = new Date();
      const invoiceDueDate = new Date(this.dueDate);

      if (today <= invoiceDueDate) {
        this.isDiscountApplied = true;
        this.discount = this.totalAmount * 0.05;
        this.finalAmount = this.totalAmount - this.discount;
      } else {
        this.finalAmount = this.totalAmount;
      }
    });
  }
  loadingPayment: boolean = false;

  makePayment() {
    const paymentDetails = {
      customerId: this.customerId,
      invoiceId: this.invoiceId,
      paymentMethod: 'Cash',
      finalAmount: this.finalAmount,
      discount: this.discount
    };
    this.loadingPayment = true;

    this.invoiceService.makePayment(this.invoiceId).subscribe((response) => {
      alert('Payment successful! An invoice will be sent to your email.');
      this.loadingPayment = false;

      this.router.navigate(['/dashboard/view-Bills']);
    });
  }
}
