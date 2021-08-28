import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {budget} from "../main-page/budget-form/model";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  URL = 'http://localhost:3000'


  constructor(private http: HttpClient) { }



  getTransactions(): Observable<budget[]> {
    return this.http.get<budget[]>(`${this.URL}/transactions`)
  }

  postTransactions(data:budget): Observable<budget> {
    return this.http.post<budget>(`${this.URL}/transactions`, data)
  }

  deleteTransactions(id): Observable<void> {
    return this.http.delete<void>(`${this.URL}/transactions/${id}`)
  }
}
