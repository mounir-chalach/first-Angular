import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userType: string | null = null;
  userName: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userType = user?.type || null;
    this.userName = user?.nom || null;// Extract user type
  }

  logout(): void {
    localStorage.removeItem('user'); // Clear session
    this.router.navigate(['/login']);
  }
}
