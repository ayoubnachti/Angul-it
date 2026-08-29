import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CaptchaStateService } from '../services/captcha-state.service';

export const captchaInProgressGuard: CanActivateFn = () => {
  const captchaState = inject(CaptchaStateService);
  const router = inject(Router);

  const inProgress = captchaState.hasStoredProgress() && !captchaState.isComplete();

  if (inProgress) {
    return router.createUrlTree(['/captcha']);
  }

  return true;
};