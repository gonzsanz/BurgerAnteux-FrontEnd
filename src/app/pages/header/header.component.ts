import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isSessionActive: boolean | undefined;
  isCartaPage: boolean = false;
  badgeCount: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.checkSession().subscribe((res) => {
      this.isSessionActive = res;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isCartaPage = event.url.includes('/carta');
      }
    });
  }

  get cartItemsCount(): number {
    return this.cartService.cartItemCount;
  }
}
