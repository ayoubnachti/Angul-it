import { Component, computed, input, output, signal } from '@angular/core';
import { generateTextRepeatContent, TextRepeatContent } from './text-repeat-generator';

@Component({
  selector: 'app-text-repeat',
  imports: [],
  templateUrl: './text-repeat.html',
  styleUrl: './text-repeat.css',
})
export class TextRepeat {
  existingContent = input<TextRepeatContent>();
  result = output<{ passed: boolean; content: TextRepeatContent }>();

  textRepeatContent = computed(() => this.existingContent() ?? generateTextRepeatContent());
  textTyped = signal<string>('');

  isReadOnly = computed(() => !!this.existingContent());

  onTyping(e: Event) {
    const input = e.target as HTMLInputElement;
    this.textTyped.set(input.value);
  }

  onSubmit() {
    const content = this.textRepeatContent();
    const passed = this.textTyped() === content.challengeText;
    this.result.emit({ passed, content });
  }
}