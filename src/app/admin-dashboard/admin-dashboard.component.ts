import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterOutlet, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  isDashboard: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.checkCurrentRoute();
        this.router.events.subscribe(() => {
      this.checkCurrentRoute();
    });
  }

  checkCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.isDashboard = currentUrl === '/admin-dashboard';
  }

  goBack() {
    this.router.navigate(['/']);
  }

  logout() {
    this.router.navigate(['/admin-login']);
  }
}
