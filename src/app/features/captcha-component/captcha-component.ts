import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { ImageGrid } from './image-grid/image-grid';
import { CaptchaStateService } from '../../services/captcha-state.service';
import { StageContent } from './stage-content.types';
import { TextRepeat } from './text-repeat/text-repeat';
import { Arithmetic } from './arithmetic/arithmetic';

@Component({
  selector: 'app-captcha-component',
  imports: [ImageGrid, TextRepeat, Arithmetic],
  templateUrl: './captcha-component.html',
  styleUrl: './captcha-component.css',
})
export class CaptchaComponent {
  captchaState = inject(CaptchaStateService);
  showError = signal(false);

  constructor() {
    this.captchaState.initStages(['image-grid', 'text-repeat', 'arithmetic']);
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

  currentArithmethicContent = computed(() => {
    const content = this.currentStageContent();
    return content?.type === 'arithmetic' ? content : undefined;
  });


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

  private getCurrentStage() {
    return this.captchaState.stages()[this.captchaState.currentStageIndex()];
  }
}
