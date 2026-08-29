import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { captchaCompleteGuard } from './cpatcha-complete-guard';

describe('captchaCompleteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => captchaCompleteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
