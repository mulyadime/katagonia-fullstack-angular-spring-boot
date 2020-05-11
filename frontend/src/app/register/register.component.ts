import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from '../__services/token.service';
import { AuthService } from '../__services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  errMsg: string;

  constructor(
    private activatedRoute: Router,
    private _fb: FormBuilder,
    private svcAuth: AuthService,
    private svcToken: TokenService
  ) { }

  ngOnInit(): void {
    this.form = this._fb.group({
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

  submit(): void {
    this.errMsg = '';
    this.svcAuth.register(this.form.value).subscribe(
      res => {
        this.autoLogin(this.form.value);
      },
      err => {
        if (err.status == 401) {
          this.errMsg = err.error.message;
        }
      }
    );
  }

  autoLogin(item: any): void {
    this.svcAuth.login(item).subscribe(
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

}
