import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }
  canActivate() {
    this.auth.user$
    .pipe(map(user => {
      this.userService.get(user.uid);
    }))
    .subscribe(x => console.log(x));
  }
}
