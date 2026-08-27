import { Component, computed, input, output, signal } from '@angular/core';
import { generateImageGridContent, ImageGridContent } from './image-grid-generator';

@Component({
  selector: 'app-image-grid',
  imports: [],
  templateUrl: './image-grid.html',
  styleUrl: './image-grid.css',
})
export class ImageGrid {
  existingContent = input<ImageGridContent>();
  result = output<{ passed: boolean; content: ImageGridContent }>();

  imageGridContent = computed(() => this.existingContent() ?? generateImageGridContent());
  selectedIds = signal<Set<string>>(new Set());

  isReadonly = computed(() => !!this.existingContent());

  toggleSelection(id: string) {
    const next = new Set(this.selectedIds());
    next.has(id) ? next.delete(id) : next.add(id);
    this.selectedIds.set(next);
  }

  onSubmit() {
    const content = this.imageGridContent();
    const targetIds = new Set(content.images.filter((i) => i.isTarget).map((i) => i.id));
    const setsAreEqual = (a: any, b: any) => a.size === b.size && a.isSubsetOf(b);
    const passed = setsAreEqual(targetIds, this.selectedIds());

    this.result.emit({ passed, content });
  }
}