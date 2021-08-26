import {NgModule} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {AuthGuardGuard} from "./login-page/auth-guard.guard";


const routes: Routes = [
  {
    path: '', component: MainPageComponent, pathMatch: 'full', canActivate: [AuthGuardGuard]
  },
  {
    path: 'login', component: LoginPageComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
