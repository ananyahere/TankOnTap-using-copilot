import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './core/welcome/welcome/welcome.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { SigninComponent } from './core/authentication/signin/signin.component';
import { SignupComponent } from './core/authentication/signup/signup.component';
import { CartComponent } from './core/cart/cart.component';
import { OrderHistoryComponent } from './core/order/order-history/order-history.component';
import { OrderDetailsComponent } from './core/order/order-details/order-details.component';
import { authRediectGuard } from './shared/guard/auth-rediect.guard';
import { authGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent, canActivate: [authRediectGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent}, 
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'cart', component: CartComponent, canActivate: [authGuard]},
  { path: 'orders', component: OrderHistoryComponent, canActivate: [authGuard]},
  { path: 'orders/:id', component: OrderDetailsComponent, canActivate: [authGuard]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }