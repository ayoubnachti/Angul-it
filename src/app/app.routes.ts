import { Routes } from '@angular/router';
import { HomeComponent } from './features/home-component/home-component';
import { CaptchaComponent } from './features/captcha-component/captcha-component';
import { ResultComponent } from './features/result-component/result-component';
import { captchaCompleteGuard } from './core/cpatcha-complete-guard';
import { captchaInProgressGuard } from './core/captcha-in-progress-guard';

export const routes: Routes = [
  {
    title: 'Home',
    path: '',
    component: HomeComponent,
    canActivate: [captchaInProgressGuard]
  },
  {
    title: 'Captcha',
    path: 'captcha',
    component: CaptchaComponent,
  },
  { 
    title: 'Result',
    path: 'result', 
    component: ResultComponent,
    canActivate: [captchaCompleteGuard]
  },
  { path: '**', redirectTo: '' },
];
