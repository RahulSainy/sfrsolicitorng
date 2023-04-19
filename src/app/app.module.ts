import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompleteProfileComponent } from './auth/complete-profile/complete-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './admin/details/details.component';
import { NavComponent } from './nav/nav.component';
@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    CompleteProfileComponent,
    DetailsComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
