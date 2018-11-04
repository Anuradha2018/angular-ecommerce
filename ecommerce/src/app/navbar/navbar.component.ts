import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(x => console.log(x));
   }
  logout() {
    this.afAuth.auth.signOut();
  }
}
