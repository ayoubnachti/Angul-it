import { Routes } from '@angular/router';
import { HomeComponent } from './features/home-component/home-component';
import { CaptchaComponent } from './features/captcha-component/captcha-component';

export const routes: Routes = [
  {
    title: "Home",
    path:"",
    component: HomeComponent
  },
  {
    title: "Captcha",
    path:"captcha",
    component: CaptchaComponent
  },
  {path: '**', redirectTo: ''},
];
