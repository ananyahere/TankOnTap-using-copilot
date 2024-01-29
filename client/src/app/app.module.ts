import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { SigninComponent } from './core/authentication/signin/signin.component';
import { SignupComponent } from './core/authentication/signup/signup.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { OrderComponent } from './core/order/order.component';
import { FeaturesComponent } from './core/welcome/features/features.component';
import { HeroComponent } from './core/welcome/hero/hero.component';
import { HeaderComponent } from './core/welcome/header/header.component';
import { WelcomeComponent } from './core/welcome/welcome/welcome.component';
import { MaterialModule } from './shared/material/material.module';
import { AppRoutingModule } from './routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    OrderComponent,
    FeaturesComponent,
    HeroComponent,
    HeaderComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
