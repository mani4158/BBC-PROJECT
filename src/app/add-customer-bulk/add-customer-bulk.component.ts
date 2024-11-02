import { Component } from '@angular/core';
import { CustomerServiceService } from '../services/customer-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthServiceService } from '../Auth/auth-service.service';

@Component({
  selector: 'app-add-customer-bulk',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-customer-bulk.component.html',
  styleUrls: ['./add-customer-bulk.component.css']
})
export class AddCustomerBulkComponent {
 

  selectedFile: File | null = null;
  uploadError: string | null = null;
  uploadSuccess: string | null = null;
  isUploading: boolean = false; // Spinner flag
  isUploadComplete: boolean = false; // Flag to disable button after successful upload

  constructor(private customerService: CustomerServiceService,private route:Router,private Auth:AuthServiceService) {
    if(this.Auth.getCustomerId() === null){
      this.route.navigate(["/Emp-login"])
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.uploadError = null;
    this.uploadSuccess = null;
    this.isUploadComplete = false; // Allow re-upload after a new file is selected
  }

  uploadFile() {
    if (!this.selectedFile) {
      this.uploadError = 'Please select a file.';
      return;
    }

    this.isUploading = true; // Start the spinner
    this.customerService.bulkUploadCustomers(this.selectedFile).subscribe(
      response => {
        this.uploadSuccess = 'File uploaded successfully!';
        this.uploadError = null;
        this.isUploading = false; // Stop the spinner
        this.isUploadComplete = true; // Disable the button after success
      },
      error => {
        this.uploadError = error.error ? error.error : 'Error uploading file: ' + error.message;
        this.uploadSuccess = null;
        this.isUploading = false; // Stop the spinner
        this.isUploadComplete = false; // Keep button active for retry after error
      }
    );
  }
}
