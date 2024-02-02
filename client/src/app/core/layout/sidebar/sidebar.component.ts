import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { LocalstorageService } from 'src/app/shared/service/localstorage.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  userId: string = '';

  constructor(private router: Router, private authService: AuthService, private localStorageService: LocalstorageService) { }

  ngOnInit() {
    this.userId = this.localStorageService.getItem('userId');
  }

  goToOrders() {
    this.router.navigate(['/order']);
  }

  onLogout() {
    this.authService.logout();
  }
}