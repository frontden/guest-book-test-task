import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {isNewUser, NewUser} from "../../models/new-user";
import {RegistrationService} from "../../services/registration.service";
import {ConfirmPasswordValidator} from "../../validators/confirm-password.validator";
import {StateMatcher} from "../../../../core/utils/state-matcher";
import {Subject, takeUntil} from "rxjs";
import {AuthService} from "../../../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnDestroy{

  destroy$: Subject<boolean> = new Subject<boolean>();

  matcher = new StateMatcher();

  form: FormGroup = this.formBuilder.group({
    avatar: this.formBuilder.control('', []),
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    name: this.formBuilder.control('', [Validators.required, Validators.maxLength(255)]),
    password: this.formBuilder.control('',
      [Validators.required, Validators.minLength(8), Validators.maxLength(255)]),
    passwordConfirmation: this.formBuilder.control('',
      [Validators.required]),

  }, {
      validator: ConfirmPasswordValidator("password", "passwordConfirmation")
  });

  get emailCtrl() {
    return this.form.get('email');
  }

  get nameCtrl() {
    return this.form.get('name');
  }

  get passwordCtrl() {
    return this.form.get('password');
  }

  get confirmPasswordCtrl() {
    return this.form.get('passwordConfirmation');
  }
  constructor(private registrationService: RegistrationService,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  onSubmitButtonClicked(user: NewUser) {

    if (!isNewUser(user)) {
      return;
    }

    this.registrationService.register(user).pipe(
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
