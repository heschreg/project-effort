import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() closeSidenav = new EventEmitter<void>();

  isAuth = false;
  authSubscription?: Subscription;

  // Der AuthService wird im provided-Array zhur Verfügung gestellt, damit nur eine Instanz davon existiert
  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    // Hier befindet man sich im Header mit der waagrechten Navigation und fängt den Event ab,
    // dass sich jemand ordnuungsgemäß angemeldet hat ==> nur die Menüpunkte "Training" und "Logout" machen in diesem Status Sinn
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus; // true oder false, angemeldet oder nicht angemeldet
    });
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

  onClose() {
    // <button mat-icon-button  (click)="onClose()">
    // Dieser Event wird in app-component subscribed und dort reagiert, d.h. die Sidebar verschwindet
    this.closeSidenav.emit();
  }

}
