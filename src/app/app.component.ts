import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthService} from "./core/services/auth.service";
import {UserService} from "./core/services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  authenticated$ = this.authService.isLoggedInSub$;

  user$ = this.userService.userSub$;

  constructor(private authService: AuthService,
              private userService: UserService) {
  }

}
