import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {StateMatcher} from "../../../../core/utils/state-matcher";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {isLoginData, LoginData} from "../../models/login-data";
import {LoginService} from "../../services/login.service";
import {AuthService} from "../../../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy{

  destroy$: Subject<boolean> = new Subject<boolean>();

  matcher = new StateMatcher();

  form: FormGroup = this.formBuilder.group({
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', [Validators.required])
  });

  get emailCtrl() {
    return this.form.get('email');
  }

  get passwordCtrl() {
    return this.form.get('password');
  }

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private authService: AuthService,
              private router: Router) { }

  login(loginData: LoginData) {

    if (!isLoginData(loginData)) {
      return;
    }

    this.loginService.login(loginData).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.authService.setSession(data);
        this.router.navigate(['/']).then();
      },
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
