import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomerServiceService } from '../services/customer-service.service';
import { AuthServiceService } from '../Auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  endDateInvalid = false;
  dueDateInvalid = false;
  customerForm: FormGroup;
  isLoading = false;  

  constructor(private fb: FormBuilder, private customerService: CustomerServiceService, private auth : AuthServiceService, private route : Router) {
    this.customerForm = this.fb.group({
      custId: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      unitsConsumed: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log(this.auth.getCustomerId());
    if(this.auth.getCustomerId() === null){
      this.route.navigate(["/Emp-login"])
    }
    this.customerForm.get('endDate')?.valueChanges.subscribe(() => {
      this.checkDates();
    });
    this.customerForm.get('dueDate')?.valueChanges.subscribe(() => {
      this.checkDates();
    });
  }

  checkDates() {
    const startDate = new Date(this.customerForm.get('startDate')?.value);
    const endDate = new Date(this.customerForm.get('endDate')?.value);
    const dueDate = new Date(this.customerForm.get('dueDate')?.value);

    this.endDateInvalid = endDate && startDate && endDate < startDate;
    this.dueDateInvalid = dueDate && startDate && dueDate < startDate;
  }

  submitForm() {
    if (this.customerForm.invalid || this.endDateInvalid || this.dueDateInvalid) {
      return;
    }
    this.isLoading = true;
  
    this.customerService.saveCustomer(this.customerForm.value).subscribe(
      response => {
        alert('Customer saved successfully!');
        this.customerForm.reset();
        this.isLoading = false; 
      },
      error => {
        console.error('Error saving customer:', error);
        this.isLoading = false; 
      }
    );
  }
}  
