import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { CompleteProfileComponent } from './auth/complete-profile/complete-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { DetailsComponent } from './admin/details/details.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profileUpdate',
    component: CompleteProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: DetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]

})
export class AppRoutingModule {}
