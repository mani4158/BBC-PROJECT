import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  otpForm: FormGroup;
  isOtpSent = false;
  loginError: string | null = null;
  otpError: string | null = null;
  router: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private route : Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
  }

  onLogin(): void {
    this.http.post('http://localhost:8080/api/auth/login', this.loginForm.value).subscribe({
      next: () => {
        this.isOtpSent = true;
        this.http.post('http://localhost:8080/api/auth/request-otp', {
           email: this.loginForm.value.username }).subscribe();
      },
      
      error: (err) => {
        this.loginError = 'Invalid username or password';
      }
    });
  }
  onSubmitOtp(): void {
    this.http.post('http://localhost:8080/api/auth/validate-otp', this.otpForm.value).subscribe({
      next: () => {
        alert('OTP validated successfully!');
        this.route.navigate(['admin-dashboard']);
      },
      error: (err) => {
        this.otpError = 'Invalid OTP';
        this.route.navigate(['/']);
      }
    });
  }goBack() {
    this.route.navigate(['/']);
  }
}