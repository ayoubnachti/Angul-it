import { generateImageGridContent, Species, VALID_SPECIES } from './image-grid-generator';

describe('generateImageGridContent', () => {
  let imageGridContent = generateImageGridContent();

  it('should create imageGridContent', () => {
    expect(imageGridContent).toBeTruthy();
  });

  it('should generate 9 images', () => {
    expect(imageGridContent.images.length).toBe(9);
  });

  it('should contain 3 target elements in the same species', () => {
    const targets = imageGridContent.images.filter((img) => img.isTarget === true);
    expect(targets.length).toBe(3);

    const getSpecies = (id: string) => id.split('-')[0];

    const targetSpecies = new Set(targets.map((target) => getSpecies(target.id)));
    expect(targetSpecies.size).toBe(1);
    expect(targetSpecies.values().next().value).toBe(imageGridContent.targetLabel);
  });

  it('targetLabel is one of the valid species', () => {
    expect(VALID_SPECIES.includes(imageGridContent.targetLabel)).toBeTruthy();
  });

  it('array has no duplicate ids', () => {
    const ids = imageGridContent.images.map((img) => img.id);
    const idsSet = new Set(ids);
    expect(ids.length).toBe(idsSet.size);
  });
});
