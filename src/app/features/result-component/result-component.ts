import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CaptchaStateService } from '../../services/captcha-state.service';

@Component({
  selector: 'app-result-component',
  imports: [],
  templateUrl: './result-component.html',
  styleUrl: './result-component.css',
})
export class ResultComponent {
  captchaState = inject(CaptchaStateService);
  private router = inject(Router);

  passedCount = computed(
    () => this.captchaState.stages().filter((s) => s.status === 'passed').length,
  );
  totalCount = computed(() => this.captchaState.stages().length);
  totalAttempts = computed(() => this.captchaState.totalAttempts());

  formattedTime = computed(() => {
    const totalSeconds = Math.round(this.captchaState.totalTimeMs() / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  });

  onRestart() {
    this.captchaState.resetProgress();
    this.router.navigate(['/']);
  }
}
