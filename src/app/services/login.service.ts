import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = `http://localhost:8080/api/auth/login`;  // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Login method to send credentials and get response
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(this.apiUrl, body, { headers: new HttpHeaders() });
  }
}
