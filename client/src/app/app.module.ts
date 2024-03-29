import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { SigninComponent } from './core/authentication/signin/signin.component';
import { SignupComponent } from './core/authentication/signup/signup.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { FeaturesComponent } from './core/welcome/features/features.component';
import { HeroComponent } from './core/welcome/hero/hero.component';
import { HeaderComponent } from './core/welcome/header/header.component';
import { WelcomeComponent } from './core/welcome/welcome/welcome.component';
import { MaterialModule } from './shared/material/material.module';
import { AppRoutingModule } from './routing.module';
import { LayoutComponent } from './core/layout/layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';
import { LoaderComponent } from './shared/component/loader/loader.component';
import { FuelCardComponent } from './core/dashboard/fuel-card/fuel-card.component';
import { AddFuelComponent } from './shared/component/add-fuel/add-fuel.component';
import { CartComponent } from './core/cart/cart.component';
import { OrderSummaryComponent } from './core/order/order-summary/order-summary.component';
import { OrderHistoryComponent } from './core/order/order-history/order-history.component';
import { OrderDetailsComponent } from './core/order/order-details/order-details.component';
import { PlaceOrderComponent } from './shared/component/place-order/place-order.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    FeaturesComponent,
    HeroComponent,
    HeaderComponent,
    WelcomeComponent,
    LayoutComponent,
    LoaderComponent,
    FuelCardComponent,
    AddFuelComponent,
    CartComponent,
    OrderSummaryComponent,
    OrderHistoryComponent,
    OrderDetailsComponent,
    PlaceOrderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // This is required to register the interceptor globally
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
