import { Component, computed, effect, input, output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { generateTextRepeatContent, TextRepeatContent } from './text-repeat-generator';

@Component({
  selector: 'app-text-repeat',
  imports: [ReactiveFormsModule],
  templateUrl: './text-repeat.html',
  styleUrl: './text-repeat.css',
})
export class TextRepeat {
  existingContent = input<TextRepeatContent>();
  result = output<{ passed: boolean; content: TextRepeatContent }>();

  textRepeatContent = computed(() => this.existingContent() ?? generateTextRepeatContent());
  isReadOnly = computed(() => !!this.existingContent());

  textRepeatForm = new FormGroup({
    answer: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, this.matchesChallengeValidator()],
    }),
  });

  constructor() {
    effect(() => {
      const content = this.existingContent();
      if (content) {
        this.textRepeatForm.patchValue({ answer: content.challengeText });
        this.textRepeatForm.disable();
      }
    });
  }

  private matchesChallengeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const content = this.textRepeatContent();
      return control.value === content.challengeText ? null : { mismatch: true };
    };
  }

  onSubmit() {
    this.textRepeatForm.markAllAsTouched();
    const passed = this.textRepeatForm.valid;
    this.result.emit({ passed, content: this.textRepeatContent() });
  }
}