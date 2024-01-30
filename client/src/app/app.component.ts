import { Component } from '@angular/core';
import { AuthService } from './shared/service/auth.service';
import { LocalstorageService } from './shared/service/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  isLoggedIn = false;

  constructor(private authService: AuthService, private localstorageService: LocalstorageService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user && !!this.localstorageService.getItem('currentAddress');
    });
  }
}
