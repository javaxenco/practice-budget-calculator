import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {budget} from "./model";

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.scss']
})
export class BudgetFormComponent implements OnInit {

  form: FormGroup
  @Output() formValue: EventEmitter<budget> = new EventEmitter<budget>()

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      amount: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })
  }

  addData() {
    if(this.form.valid){
      const formFields = {...this.form.value}
      this.formValue.emit(formFields)
      this.form.reset()
    }
  }
}
