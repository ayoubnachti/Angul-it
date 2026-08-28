import { Routes } from '@angular/router';
import { HomeComponent } from './features/home-component/home-component';
import { CaptchaComponent } from './features/captcha-component/captcha-component';
import { ResultComponent } from './features/result-component/result-component';

export const routes: Routes = [
  {
    title: 'Home',
    path: '',
    component: HomeComponent,
  },
  {
    title: 'Captcha',
    path: 'captcha',
    component: CaptchaComponent,
  },
  { 
    title: 'Result',
    path: 'result', 
    component: ResultComponent 
  },
  { path: '**', redirectTo: '' },
];
