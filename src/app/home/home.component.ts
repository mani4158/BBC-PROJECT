import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToAdmin() {
    this.router.navigate(['/admin-login']);
  }

  navigateToEmployee() {
    this.router.navigate(['/Emp-login']);
  }
}
