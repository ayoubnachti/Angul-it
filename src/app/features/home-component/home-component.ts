import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CaptchaStateService } from '../../services/captcha-state.service';

@Component({
  selector: 'app-home-component',
  imports: [MatButtonModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
  private captchaState = inject(CaptchaStateService);
  private router = inject(Router);

  onStartChallenge() {
    this.captchaState.startSessionTimer();
    this.router.navigate(['/captcha']);
  }
}
