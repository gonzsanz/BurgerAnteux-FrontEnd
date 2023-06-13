import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { CarritoComponent } from '../carrito/carrito.component';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isSessionActive: boolean | undefined;
  isCartaPage: boolean = false;
  badgeCount: number = 0;
  CarritoComponent: any;
  isMenuExpanded: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService,
    private dialog: MatDialog,
    private userService: UserService
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
    this.isMenuExpanded = false;
    this.checkIsAdmin();
  }

  collapseMenu() {
    this.isMenuExpanded = false;
  }

  toggleMenu() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  checkIsAdmin(): void {
    // comprueba si el usuario es admin
    this.userService
      .getUser(sessionStorage.getItem('email')!)
      .subscribe((res) => {
        if (res.role === 'admin') {
          this.isAdmin = true;
        }
      });
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });
  }

  get cartItemsCount(): number {
    return this.cartService.cartItemCount;
  }

  openCart(): void {
    if (this.isCartaPage) {
      const dialogRef = this.dialog.open(CarritoComponent, {
        width: '800px',
        height: 'auto',
        data: CarritoComponent,
      });
    }
  }
}
