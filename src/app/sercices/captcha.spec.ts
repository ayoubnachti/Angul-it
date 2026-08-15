import { TestBed } from '@angular/core/testing';

import { CaptchaStateService } from './captcha-state.service';

describe('captchaStateService', () => {
  let service: CaptchaStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaptchaStateService);
    service.stages.set([
      { status: 'pending' },
      { status: 'pending' },
      { status: 'pending' },
    ]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shoud contain 3 stages', () => {
    expect(service.stages().length).toBe(3);
  });

  it('the challenged should fail', () => {
    expect(service.isComplete()).toBeFalsy();
  });

  it('the challenge should pass', () => {
    service.stages.update((currentStages) =>
      currentStages.map((stage) => {
        return { ...stage, status: 'passed' };
      })
    );

    expect(service.isComplete()).toBeTruthy();
  });

  it('should be index 0 for the first time', () => {
    expect(service.currentStageIndex()).toBe(0);
  });

  it('current stage should validate and the index should increment', () => {
    const passedStageIndex = service.currentStageIndex();
    service.markPassed();

    expect(service.stages()[passedStageIndex].status).toBe('passed');
    expect(service.currentStageIndex() - passedStageIndex).toBe(1);
  });

  it('advance should not go past the last stage', () => {
    service.currentStageIndex.set(2);
    service.advance();
    expect(service.currentStageIndex()).toBe(2);
  });

  it('goToPrevious should decrement the index', () => {
    service.currentStageIndex.set(1);
    service.goToPrevious();
    expect(service.currentStageIndex()).toBe(0);
  });

  it('goToPrevious should not go below 0', () => {
    service.goToPrevious();
    expect(service.currentStageIndex()).toBe(0);
  });

  it('isComplete should be false when stages is empty', () => {
    service.stages.set([]);
    expect(service.isComplete()).toBeFalsy();
  });
});
