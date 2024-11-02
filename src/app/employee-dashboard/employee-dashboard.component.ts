import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../Auth/auth-service.service';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  isDashboard: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private auth : AuthServiceService) {}

  ngOnInit() {
    this.checkCurrentRoute();

    this.router.events.subscribe(() => {
      this.checkCurrentRoute();
    });
  }

  checkCurrentRoute() {
    this.isDashboard = this.router.url === '/dashboard';
  }

  goBack() {
    this.router.navigate(['..']);
    this.isDashboard = false; 
  }

  Dashboard() {
    this.isDashboard = true; 
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.auth.removeCustomerId();
    this.router.navigate(['/Emp-login']);
    this.isDashboard = false;
  }
}
