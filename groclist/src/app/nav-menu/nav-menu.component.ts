import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatMenuModule, MatMenuPanel } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule
  ],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router) {
  }

  public changePassword(): void {
    this.router.navigate(['/changepassword']);
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
