import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/@gmail\.com$/)]],
      phone_number: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.employeeForm.valid) {
      this.loading = true; 
      const employeeData = this.employeeForm.value;
      this.http.post('http://localhost:8080/api/employees/add', employeeData, {
        responseType: 'text'
      })
      .subscribe({
        next: (response) => {
          alert('Employee added successfully');
          this.employeeForm.reset();
        },
        error: (err) => {
          console.error('Error adding employee', err);
          alert('Error adding employee');
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }
}
