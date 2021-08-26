import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BudgetFormComponent } from './main-page/budget-form/budget-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LoginPageComponent } from './login-page/login-page.component';
import {AppRoutingModule} from "./app.routing-module";


import {environment} from "../environments/environment";


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    BudgetFormComponent,
    LoginPageComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
