import { Component, OnInit } from '@angular/core';
import {budget} from "./budget-form/model";
import {TransactionService} from "../services/transaction.service";
import {finalize} from "rxjs/operators";
import {showAnimation} from "./animation";
import {AuthServiceService} from "../services/auth-service.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations: [showAnimation]
})
export class MainPageComponent implements OnInit {

 fee: number = null;
 data: budget[];
 filterAscendPlus: boolean = false;
 filterAscendMinus: boolean = false;
 ascendHighPlus: boolean = false;
 ascendHighMinus: boolean = false;
  MINUS_DATA: budget[];
  PLUS_DATA: budget[];

  constructor(private transactionService: TransactionService, private auth: AuthServiceService) { }

  ngOnInit(): void {
   this.getTransactionData()
  }

  getTransactionData() {
   this.transactionService.getTransactions().pipe(
     finalize(() => this.recalculateSum())
   ).subscribe((res)=>{
     this.data = res
     this.MINUS_DATA = this.data.filter(m => m.amount < 0)
     this.PLUS_DATA = this.data.filter(m => m.amount > 0)
   },
     )
  }

  receiveData(data: budget) {
    this.transactionService.postTransactions(data).pipe(
      // finalize(() =>this.getTransactionData())
    ).subscribe();
  }

  recalculateSum(): void {
   this.fee = 0
   this.data.forEach((el) => {
     this.fee += el.amount
   })

  }

  removeItem(id: number) {
    this.transactionService.deleteTransactions(id).pipe(
      finalize(() => {
        this.getTransactionData()
      })
    ).subscribe()
  }

  filterByPrice(plus: boolean) {
    if(plus){
      this.filterAscendPlus = !this.filterAscendPlus
      if(this.filterAscendPlus){
       this.PLUS_DATA = this.PLUS_DATA.sort((a,b) => b.amount - a.amount)
      }
      else {
        this.PLUS_DATA = this.PLUS_DATA.sort((a,b) => a.amount - b.amount)
      }
    }
    else {
      this.filterAscendMinus = !this.filterAscendMinus;
      if(this.filterAscendMinus){
        this.MINUS_DATA = this.MINUS_DATA.sort((a,b) => a.amount - b.amount)
      }
      else {
        this.MINUS_DATA = this.MINUS_DATA.sort((a,b) => b.amount- a.amount)
      }
    }

  }

  filterByDate(value: boolean) {
    if(value) {
      this.ascendHighPlus = !this.ascendHighPlus
      if(this.ascendHighPlus){
      this.PLUS_DATA = this.PLUS_DATA.sort((a,b) => a.id - b.id)
      }
      else {
        this.PLUS_DATA = this.PLUS_DATA.sort((a,b) => b.id - a.id)
      }
    }
    else {
      this.ascendHighMinus = !this.ascendHighMinus
      if(this.ascendHighMinus){
        this.MINUS_DATA = this.MINUS_DATA.sort((a,b) => a.id - b.id)
      }
      else {
        this.MINUS_DATA = this.MINUS_DATA.sort((a,b) => b.id - a.id)
      }
    }
  }

  logOut() {
    this.auth.logout()
  }
}
