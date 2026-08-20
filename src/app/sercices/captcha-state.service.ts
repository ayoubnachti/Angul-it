import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { StageContent } from '../features/captcha-component/stage-content.types';

export interface StageState {
  status: 'pending' | 'passed';
  content?: StageContent;
}

@Injectable({
  providedIn: 'root',
})
export class CaptchaStateService {
  stages: WritableSignal<StageState[]> = signal([]);
  currentStageIndex: WritableSignal<number> = signal(0);
  isComplete: Signal<boolean> = computed(
    () => this.stages().length > 0 && !this.stages().some((stage) => stage.status != 'passed')
  );

  setStageContent(index: number, content: StageContent): void {
    this.stages.update((stages) =>
      stages.map((stage, i) => (i === index ? { ...stage, content } : stage))
    );
  }

  public markPassed() {
    this.stages.update((currentStagesValue) =>
      currentStagesValue.map((stage, index) =>
        index === this.currentStageIndex() ? { ...stage, status: 'passed' } : stage
      )
    );

    this.advance();
  }

  public advance() {
    if (this.currentStageIndex() == this.stages().length - 1) {
      return;
    }

    this.currentStageIndex.set(this.currentStageIndex() + 1);
  }

  public goToPrevious() {
    if (this.currentStageIndex() == 0) {
      return;
    }
    this.currentStageIndex.set(this.currentStageIndex() - 1);
  }
}
