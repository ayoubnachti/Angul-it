import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { ImageGrid } from './image-grid/image-grid';
import { CaptchaStateService } from '../../sercices/captcha-state.service';
import { StageContent } from './stage-content.types';

@Component({
  selector: 'app-captcha-component',
  imports: [ImageGrid],
  templateUrl: './captcha-component.html',
  styleUrl: './captcha-component.css',
})
export class CaptchaComponent {
  captchaState = inject(CaptchaStateService);
  showError = signal(false);

  constructor() {
    this.captchaState.initStages(3);
  }

  currentStageContent = computed(
    () => this.captchaState.stages()[this.captchaState.currentStageIndex()]?.content
  );
  currentStageStatus = computed(
    () => this.captchaState.stages()[this.captchaState.currentStageIndex()]?.status
  );

  onPrevious() {
    this.captchaState.goToPrevious();
  }

  onChallengeResult(event: { passed: boolean; content: StageContent }) {
    this.showError.set(!event.passed);
    if (event.passed) {
      this.captchaState.setStageContent(this.captchaState.currentStageIndex(), event.content);
      this.captchaState.markPassed();
    }
  }
}
