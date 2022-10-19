import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./core/guards/auth.guard";
import {NotAuthGuard} from "./core/guards/not-auth.guard";

const routes: Routes = [
  {
    path: 'register',
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/registration/registration.module').then(m => m.RegistrationModule),
      }
    ],
    canActivate: [NotAuthGuard]
  },
  {
    path: 'login',
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
      }
    ],
    canActivate: [NotAuthGuard]
  },
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
      }
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
