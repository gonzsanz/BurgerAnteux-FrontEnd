import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const email = sessionStorage.getItem('email');
    if (email) {
      return this.userService.getUser(email).pipe(
        map((response) => {
          if (response.role === 'admin') {
            return true;
          } else {
            this.router.navigate(['**']);
            return false;
          }
        })
      );
    } else {
      this.router.navigate(['/inicio']);
      return false;
    }
  }
}
