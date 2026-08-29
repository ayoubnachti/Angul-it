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
import { ArithmeticContent, generateArithmeticContent } from './arithmetic-generator';

@Component({
  selector: 'app-arithmetic',
  imports: [ReactiveFormsModule],
  templateUrl: './arithmetic.html',
  styleUrl: './arithmetic.css',
})
export class Arithmetic {
  existingContent = input<ArithmeticContent>();
  result = output<{ passed: boolean; content: ArithmeticContent }>();

  arithmeticContent = computed(() => this.existingContent() ?? generateArithmeticContent());
  isReadOnly = computed(() => !!this.existingContent());

  arithmeticForm = new FormGroup({
    answer: new FormControl<number | null>(null, {
      validators: [Validators.required, this.matchesAnswerValidator()],
    }),
  });

  constructor() {
    effect(() => {
      const content = this.existingContent();
      if (content) {
        this.arithmeticForm.patchValue({ answer: content.answer });
        this.arithmeticForm.disable();
      }
    });
  }

  private matchesAnswerValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const content = this.arithmeticContent();
      return control.value === content.answer ? null : { mismatch: true };
    };
  }

  onSubmit() {
    this.arithmeticForm.markAllAsTouched();
    const passed = this.arithmeticForm.valid;
    this.result.emit({ passed, content: this.arithmeticContent() });
  }
}
