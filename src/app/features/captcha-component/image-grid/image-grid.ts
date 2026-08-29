import { Component, computed, effect, input, output, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { generateImageGridContent, ImageGridContent } from './image-grid-generator';

@Component({
  selector: 'app-image-grid',
  imports: [ReactiveFormsModule],
  templateUrl: './image-grid.html',
  styleUrl: './image-grid.css',
})
export class ImageGrid {
  existingContent = input<ImageGridContent>();
  result = output<{ passed: boolean; content: ImageGridContent }>();
  hasSubmitted = signal<boolean>(false);

  imageGridContent = computed(() => this.existingContent() ?? generateImageGridContent());
  isReadOnly = computed(() => !!this.existingContent());

  imageGridForm = new FormGroup({});

  constructor() {
    effect(() => {
      const content = this.imageGridContent(); // reactive — runs once content is real
      const controls: Record<string, FormControl<boolean>> = {};

      for (const image of content.images) {
        controls[image.id] = new FormControl(
          { value: image.isTarget && this.isReadOnly(), disabled: this.isReadOnly() },
          { nonNullable: true }
        );
      }

      this.imageGridForm = new FormGroup(controls, { validators: this.exactMatchValidator() });
    }, { allowSignalWrites: true });
  }

  private exactMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const content = this.imageGridContent();
      const formGroup = group as FormGroup;
      const allMatch = content.images.every(
        (image) => !!formGroup.controls[image.id]?.value === image.isTarget
      );
      return allMatch ? null : { mismatch: true };
    };
  }

  onSubmit() {
    this.imageGridForm.markAllAsTouched();
    const passed = this.imageGridForm.valid;
    this.hasSubmitted.set(true)
    this.result.emit({ passed, content: this.imageGridContent() });
  }
}