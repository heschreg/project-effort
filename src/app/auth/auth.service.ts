import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.models';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user!: User;

  constructor (private router: Router) {

  }

  registerUser (authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }

  login (authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }

  logout() {
    this.user = {email: '', userId: ''};
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    // Der interne user ist privat und soll nicht geändert werden, daher wird mit dem
    // Spread-Operator eine Kopie mit den identischen Ausprägungen zurück gegeben
    return {...this.user};
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccessfully () {
    // Event wird ausgestreut
    this.authChange.next(true);

    this.router.navigate(['/training']);
  }
}
