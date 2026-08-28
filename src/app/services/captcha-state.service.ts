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
  totalAttempts: number;
  sessionStartedAt?: number;
  sessionCompletedAt?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CaptchaStateService {
  stages: WritableSignal<StageState[]> = signal([]);
  currentStageIndex: WritableSignal<number> = signal(0);
  totalAttempts: WritableSignal<number> = signal(0);
  sessionStartedAt: WritableSignal<number | undefined> = signal(undefined);
  sessionCompletedAt: WritableSignal<number | undefined> = signal(undefined);

  isComplete: Signal<boolean> = computed(
    () => this.stages().length > 0 && !this.stages().some((stage) => stage.status != 'passed')
  );

  totalTimeMs: Signal<number> = computed(() => {
    const start = this.sessionStartedAt();
    const end = this.sessionCompletedAt();
    return start && end ? end - start : 0;
  });

  constructor() {
    this.restoreFromStorage();

    effect(() => {
      const progress: PersistedProgress = {
        stages: this.stages(),
        currentStageIndex: this.currentStageIndex(),
        totalAttempts: this.totalAttempts(),
        sessionStartedAt: this.sessionStartedAt(),
        sessionCompletedAt: this.sessionCompletedAt(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    });
  }

  hasStoredProgress(): boolean {
    return this.stages().length > 0;
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

  recordAttempt() {
    this.totalAttempts.update((n) => n + 1);
  }

  startSessionTimer() {
    if (!this.sessionStartedAt()) {
      this.sessionStartedAt.set(Date.now());
    }
  }

  public markPassed() {
    this.stages.update((currentStagesValue) =>
      currentStagesValue.map((stage, index) =>
        index === this.currentStageIndex() ? { ...stage, status: 'passed' as const } : stage
      )
    );

    if (this.stages().every((s) => s.status === 'passed')) {
      this.sessionCompletedAt.set(Date.now());
    }

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

  resetProgress() {
    this.stages.set([]);
    this.currentStageIndex.set(0);
    this.totalAttempts.set(0);
    this.sessionStartedAt.set(undefined);
    this.sessionCompletedAt.set(undefined);
    localStorage.removeItem(STORAGE_KEY);
  }

  private restoreFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed: PersistedProgress = JSON.parse(raw);
      this.stages.set(parsed.stages);
      this.currentStageIndex.set(parsed.currentStageIndex);
      this.totalAttempts.set(parsed.totalAttempts ?? 0);
      this.sessionStartedAt.set(parsed.sessionStartedAt);
      this.sessionCompletedAt.set(parsed.sessionCompletedAt);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}