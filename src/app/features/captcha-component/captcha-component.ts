import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ImageGrid } from './image-grid/image-grid';
import { TextRepeat } from './text-repeat/text-repeat';
import { Arithmetic } from './arithmetic/arithmetic';
import { CaptchaStateService } from '../../services/captcha-state.service';
import { StageContent } from './stage-content.types';

@Component({
  selector: 'app-captcha-component',
  imports: [ImageGrid, TextRepeat, Arithmetic],
  templateUrl: './captcha-component.html',
  styleUrl: './captcha-component.css',
})
export class CaptchaComponent {
  captchaState = inject(CaptchaStateService);
  private router = inject(Router);
  showError = signal(false);

  constructor() {
    if (!this.captchaState.hasStoredProgress()) {
      this.captchaState.initStages(['image-grid', 'text-repeat', 'arithmetic']);
    }

    effect(() => {
      if (this.captchaState.isComplete()) {
        this.router.navigate(['/result']);
      }
    });
  }

  currentStageContent = computed(() => this.getCurrentStage()?.content);
  currentStageStatus = computed(() => this.getCurrentStage()?.status);
  currentStageType = computed(() => this.getCurrentStage()?.type);

  currentImageGridContent = computed(() => {
    const content = this.currentStageContent();
    return content?.type === 'image-grid' ? content : undefined;
  });

  currentTextRepeatContent = computed(() => {
    const content = this.currentStageContent();
    return content?.type === 'text-repeat' ? content : undefined;
  });

  currentArithmeticContent = computed(() => {
    const content = this.currentStageContent();
    return content?.type === 'arithmetic' ? content : undefined;
  });

  onPrevious() {
    this.captchaState.goToPrevious();
  }

  onChallengeResult(event: { passed: boolean; content: StageContent }) {
    this.showError.set(!event.passed);

    if (!event.passed) {
      this.captchaState.recordAttempt();
      return;
    }

    this.captchaState.setStageContent(this.captchaState.currentStageIndex(), event.content);
    this.captchaState.markPassed();
  }

  isLastChallenge(): boolean {
    return this.captchaState.currentStageIndex() == this.captchaState.stages().length - 1;
  }

  private getCurrentStage() {
    return this.captchaState.stages()[this.captchaState.currentStageIndex()];
  }
}