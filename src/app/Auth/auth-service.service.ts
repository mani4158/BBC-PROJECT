import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  setCustomerId(customerId: string): void {
    localStorage.setItem('customerId', customerId);
  }

  getCustomerId(): string | null {
    return localStorage.getItem('customerId');
  }

  removeCustomerId(): void {
    localStorage.removeItem('customerId');
  }
}
