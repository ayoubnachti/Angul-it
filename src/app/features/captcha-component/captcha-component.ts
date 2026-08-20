import { Component, inject, signal, ViewChild } from '@angular/core';
import { ImageGrid } from './image-grid/image-grid';
import { CaptchaStateService } from '../../sercices/captcha-state.service';
import { CaptchaChallenge } from './captcha-challenge';

@Component({
  selector: 'app-captcha-component',
  imports: [ImageGrid],
  templateUrl: './captcha-component.html',
  styleUrl: './captcha-component.css',
})
export class CaptchaComponent {
  captchaState = inject(CaptchaStateService);
  showError = signal(false);

  @ViewChild(CaptchaChallenge) currentChallenge!: CaptchaChallenge;

  
  ngAfterViewInit() {
    const stage = this.captchaState.stages()[this.captchaState.currentStageIndex()];
    const content = this.currentChallenge.init(stage.content);
    if (!stage.content) {
      this.captchaState.setStageContent(this.captchaState.currentStageIndex(), content);
    }
  }

  onPrevious() {
    this.captchaState.goToPrevious();
  }

  onNext() {
    const passed = this.currentChallenge.validate();
    this.showError.set(!passed);

    if (passed) {
      this.captchaState.markPassed();
      this.captchaState.advance();
    }
  }

  isLastChallenge(): boolean {
    return this.captchaState.currentStageIndex() == this.captchaState.stages().length - 1;
  }
}
