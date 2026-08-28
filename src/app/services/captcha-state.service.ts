import { computed, effect, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { StageContent } from '../features/captcha-component/stage-content.types';

const STORAGE_KEY = 'angul-it-captcha-progress';

export interface StageState {
  type: StageContent['type'];
  status: 'pending' | 'passed';
  content?: StageContent;
}

interface PersistedProgress {
  stages: StageState[];
  currentStageIndex: number;
}

@Injectable({ providedIn: 'root' })
export class CaptchaStateService {
  stages: WritableSignal<StageState[]> = signal([]);
  currentStageIndex: WritableSignal<number> = signal(0);
  isComplete: Signal<boolean> = computed(
    () => this.stages().length > 0 && !this.stages().some((stage) => stage.status != 'passed')
  );

  constructor() {
    this.restoreFromStorage();

    effect(() => {
      const progress: PersistedProgress = {
        stages: this.stages(),
        currentStageIndex: this.currentStageIndex(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    });
  }

  hasStoredProgress(): boolean {
    return this.stages().length > 0;
  }

  private restoreFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed: PersistedProgress = JSON.parse(raw);
      this.stages.set(parsed.stages);
      this.currentStageIndex.set(parsed.currentStageIndex);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  initStages(types: StageContent['type'][]) {
    this.stages.set(types.map((type) => ({ type, status: 'pending' as const })));
    this.currentStageIndex.set(0);
  }

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
