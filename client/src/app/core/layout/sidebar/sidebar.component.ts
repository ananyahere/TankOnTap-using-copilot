import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { LocalstorageService } from 'src/app/shared/service/localstorage.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  userId: string = '';

  constructor(private authService: AuthService, private localStorageService: LocalstorageService) { }

  ngOnInit() {
    this.userId = this.localStorageService.getItem('userId');
  }

  onLogout() {
    this.authService.logout();
  }
}