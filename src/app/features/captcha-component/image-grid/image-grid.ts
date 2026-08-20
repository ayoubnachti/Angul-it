import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { generateImageGridContent, ImageGridContent } from './image-grid-generator';
import { CaptchaChallenge } from '../captcha-challenge';

@Component({
  selector: 'app-image-grid',
  imports: [MatButtonToggleModule, FormsModule, ReactiveFormsModule],
  templateUrl: './image-grid.html',
  styleUrl: './image-grid.css',
  providers: [{ provide: CaptchaChallenge, useExisting: ImageGrid }],
})
export class ImageGrid extends CaptchaChallenge {
  selectedIds = signal<Set<string>>(new Set());
  imageGridContent!: ImageGridContent;

  init(existingContent?: ImageGridContent) {
    this.imageGridContent = existingContent ?? generateImageGridContent();
    return this.imageGridContent;
  }

  toggleSelection(id: string) {
    const next = new Set(this.selectedIds());
    next.has(id) ? next.delete(id) : next.add(id);
    this.selectedIds.set(next);
  }

  validate(): boolean {
    let targetIds = new Set(
      this.imageGridContent.images.filter((image) => image.isTarget).map((image) => image.id)
    );
    const setsAreEqual = (setA: any, setB: any) => setA.size === setB.size && setA.isSubsetOf(setB);
    const isValid: boolean = setsAreEqual(targetIds, this.selectedIds());
    return isValid;
  }
}
