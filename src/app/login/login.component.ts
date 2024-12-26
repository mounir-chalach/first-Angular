import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { LoginService } from '../services/login.service';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";  // Adjust the import path based on your project structure

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onLogin() {
    console.log('Attempting login...'); // Debug log
    this.loginService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        console.log('Response received from API:', response); // Log response
        localStorage.setItem('user', JSON.stringify(response)); // Store the user info in localStorage

        // Redirect based on user type
        if (response.type === 'Admin') {
          this.router.navigate(['/users']); // Redirect Admin to users page
        } else if (response.type === 'Employee') {
          this.router.navigate(['/projectsEmployee']); // Redirect Employee
        } else if (response.type === 'Manager' || response.type === 'Director') {
          this.router.navigate(['/projects']); // Redirect Manager
        }
        else {
          this.errorMessage = 'Unknown user type. Contact administrator.';
        }
      },

      error: (error) => {
        console.error('Error occurred during login:', error); // Log error
        this.errorMessage = 'Invalid credentials, please try again.';
      }
    });
  }


}
