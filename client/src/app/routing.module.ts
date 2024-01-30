import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './core/welcome/welcome/welcome.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { SigninComponent } from './core/authentication/signin/signin.component';
import { SignupComponent } from './core/authentication/signup/signup.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent}, 
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }