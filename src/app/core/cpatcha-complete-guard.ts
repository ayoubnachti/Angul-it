import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CaptchaStateService } from '../services/captcha-state.service';

export const captchaCompleteGuard: CanActivateFn = () => {
  const captchaState = inject(CaptchaStateService);
  const router = inject(Router);

  if (captchaState.isComplete()) {
    return true;
  }

  const previousUrl = router.url;
  console.log(previousUrl);
  if (previousUrl && previousUrl !== '/result') {
    return router.createUrlTree([previousUrl]);
  }
  return router.createUrlTree(['/']);
};