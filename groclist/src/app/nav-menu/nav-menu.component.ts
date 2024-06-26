import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {

  public isExpanded: boolean = false;

  constructor(private readonly router: Router) {}
  public collapse(): void {
    this.isExpanded = false;
  }

  public toggle(): void {
    this.isExpanded = !this.isExpanded;
  }

  public changePassword(): void {
    this.router.navigate(['/changepassword'])
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
