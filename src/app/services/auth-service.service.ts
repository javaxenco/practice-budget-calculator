import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../login-page/login.interface";
import {Observable, Subject, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError, finalize, tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  public $error: Subject<string> = new Subject<string>()
  URL;

  constructor(private http: HttpClient, private route: Router) { }

  get token() {
    return ''
}

  login(user: User): Observable<User> {
  return this.http.post<User>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user).pipe(
    catchError(this.handleError.bind(this)),
    finalize(() => localStorage.setItem('loggedIn', 'true'))
  )
  }

  isAuthenticated(): boolean {
    const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    return loggedIn
  }

  logout() {
    this.route.navigate(['login'], {
      queryParams: {
        loggedOut: true
      }
    })
    localStorage.setItem('loggedIn', 'false')
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;

    switch(message) {
      case 'INVALID_PASSWORD':
        this.$error.next('Invalid password')
        break;
      case 'INVALID_EMAIL':
        this.$error.next('Incorrect email')
        break;
      case 'EMAIL_NOT_FOUND':
        this.$error.next('Incorrect email')
        break;
    }

    console.log(message)
    return throwError(message)
  }

}
