import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let isLoggedIn = false;
  inject(AuthService).currentUser.subscribe(user => {
    isLoggedIn = !!user;
  })
  if(isLoggedIn) return true;
  else {  
    inject(Router).navigate(['/signin']);
    return false;
  }
};
