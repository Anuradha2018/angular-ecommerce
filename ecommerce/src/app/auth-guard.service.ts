import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }
  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(map(user => {
      if (user) {
        return true;
    }
      this.router.navigate(['/login']);
      return false;
    }));
  }
}
