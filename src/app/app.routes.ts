import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomeComponent } from './home/home.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AddCustomerBulkComponent } from './add-customer-bulk/add-customer-bulk.component';
import { ManualPaymentComponent } from './manual-payment/manual-payment.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ViewBillsComponent } from './view-bills/view-bills.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { 
    path: 'admin-dashboard',
     component: AdminDashboardComponent,
     children:[
      { path: 'add-employee', component: AddEmployeeComponent },
      { path: 'view-bills', component: ViewBillsComponent },
      { path: 'payment', component: TransactionsComponent },
      { path: 'manual-Payment', component: ManualPaymentComponent },

 
     ]
  },
  //{ path: 'admin', component: AdminPageComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'Emp-login', component: EmployeeLoginComponent },

  //{ path: 'add-employee', component: AddEmployeeComponent }, 

  {
    path: 'dashboard',
    component: EmployeeDashboardComponent,
    children: [
      { path: 'add-cust', component: AddCustomerComponent },
      { path: 'bulk-upload', component: AddCustomerBulkComponent },
       { path: 'manual-Payment', component: ManualPaymentComponent },
       { path: 'view-Bills', component: ViewBillsComponent },
      { path: 'view-transactions', component: TransactionsComponent },
      { path: 'payment', component: TransactionsComponent },
      { path: 'view-bills', component: ViewBillsComponent },
    ]
  }
];
