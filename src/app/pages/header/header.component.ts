import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isCartaPage: boolean = false;
  badgeCount: number = 0;

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isCartaPage = event.url.includes('/carta');
      }
    });
  }

  get cartItemsCount(): number {
    return this.cartService.cartItemCount;
  }

}