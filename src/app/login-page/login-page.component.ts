import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "./login.interface";
import {AuthServiceService} from "../services/auth-service.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router, public authService: AuthServiceService) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })

  }

  onSubmit() {
    if(this.form.invalid) {
      return
    }
    const user: User = {...this.form.value}
    this.authService.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigateByUrl('');
    })
  }

}
