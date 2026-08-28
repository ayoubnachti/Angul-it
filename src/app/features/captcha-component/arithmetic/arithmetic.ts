import { Component, computed, input, output, signal } from '@angular/core';
import { ArithmeticContent, generateArithmeticContent } from './arithmetic-generator';

@Component({
  selector: 'app-arithmetic',
  imports: [],
  templateUrl: './arithmetic.html',
  styleUrl: './arithmetic.css',
})
export class Arithmetic {
  existingContent = input<ArithmeticContent>();
  result = output<{ passed: boolean; content: ArithmeticContent }>();

  arithmeticContent = computed(() => this.existingContent() ?? generateArithmeticContent());
  userAnswer = signal<number>(0);

  isReadOnly = computed(() => !!this.existingContent());

  onInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.userAnswer.set(+input.value);
  }

  onSubmit() {
    const content = this.arithmeticContent();
    const passed = this.userAnswer() === content.answer;
    this.result.emit({ passed, content });
  }
}
