import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; 
  constructor(private http: HttpClient) {}
  requestOtp(user: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/request-otp`, { username: user }, {
      responseType: 'text'
    });
  }
  verifyOtp(otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-otp`, { params :{request : otp} });
  }
}
