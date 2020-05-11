import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../__services/auth.service';
import { TokenService } from '../__services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  errMsg: string;

  constructor(
    private activatedRoute: Router,
    private _fb: FormBuilder,
    private svcAuth: AuthService,
    private svcToken: TokenService
  ) { }

  ngOnInit(): void {
    this.formLogin = this._fb.group({
      username: new FormControl(
        '',
        Validators.required,
        // Validators.minLength(3),
      ),
      password: new FormControl(
        '',
        Validators.required,
        // Validators.minLength(6),
      ),
    });
  }

  login(): void {
    this.errMsg = '';
    this.svcAuth.login(this.formLogin.value).subscribe(
      res => { 
        this.svcToken.save(res.token, res.username);
        this.activatedRoute.navigate(['']);
      },
      err => {
        if (err.status == 401) {
          this.errMsg = err.error.message;
        }
      }
    );
  }

  register(): void {
    this.activatedRoute.navigate(['register']);
  }

}
