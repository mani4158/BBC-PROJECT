import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../Auth/auth-service.service';

@Component({
  selector: 'app-employee-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {
  employeeForm: FormGroup;
  otpForm: FormGroup;
  otpGenerated = false;
  otpError = false;
  otpVerified = false;
  loginError = '';
  loadingOtp = false;
  loadingVerifyOtp = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: Router, private auth : AuthServiceService) {
    this.employeeForm = this.fb.group({
      employeeId: ['', Validators.required]
    });

    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  submitEmployeeId() {
    if (this.employeeForm.invalid) {
      return;
    }

    const employeeId = this.employeeForm.value.employeeId;
    this.loadingOtp = true;

    this.http.post<{ message: string }>(`http://localhost:8080/api/employees/generate-otp`, { employeeId })
      .subscribe({
        next: (response) => {
          this.loadingOtp = false;
          this.otpGenerated = true;  
          this.otpError = false;
          this.loginError = '';
          this.otpForm.reset();
          console.log(response.message);
        },
        error: (err) => {
          this.loadingOtp = false;
          if (err.status === 400) {
            this.loginError = 'Invalid Employee ID';
          } else {
            console.error('Error generating OTP', err);
          }
        }
      });
  }

  verifyOtp() {
    if (this.otpForm.invalid) {
      return;
    }

    const otp = this.otpForm.value.otp;
    this.loadingVerifyOtp = true;

    this.http.post<{ message: string }>(`http://localhost:8080/api/employees/verify-otp`, { otp })
      .subscribe({
        next: (response) => {
          this.loadingVerifyOtp = false;
          this.otpVerified = true;
          this.otpError = false;
          console.log(response.message);
          this.auth.setCustomerId(this.employeeForm.get('employeeId')?.value)
          this.route.navigate(['/dashboard']);
        },
        error: (err) => {
          this.loadingVerifyOtp = false;
          console.error('Error verifying OTP', err);
          this.otpError = true;
        }
      });
  }

  clearAllData() {
    this.employeeForm.reset();
    this.otpForm.reset();
    this.otpGenerated = false;
    this.otpError = false;
    this.otpVerified = false;
    this.loginError = '';
  }

  goBack() {
    this.route.navigate(['/']);
  }
}
