export type Species = 'cat' | 'bird' | 'dog';
export const VALID_SPECIES: Species[] = ['cat', 'bird', 'dog'];

const ANIMAL_SPECIES = {
  cat: 17,
  bird: 11,
  dog: 17,
};

export interface ImageGridContent {
  type: 'image-grid';
  targetLabel: Species;
  images: { id: string; src: string; isTarget: boolean }[];
}

const buildSrcPath = (species: Species, num: number) => `/images/${species}/${species}-${num}.jpg`;

export function generateImageGridContent(): ImageGridContent {
  const randomSpecies = Math.floor(Math.random() * VALID_SPECIES.length);
  const targetLabel = VALID_SPECIES[randomSpecies];

  const imageGridContent: ImageGridContent = {
    type: 'image-grid',
    targetLabel,
    images: [],
  };

  for (const species of VALID_SPECIES) {
    const speciesPictures: number[] = pickRandomPictures(species);

    for (const n of speciesPictures) {
      imageGridContent.images.push({
        id: `${species}-${n}`,
        src: buildSrcPath(species, n),
        isTarget: species === targetLabel,
      });
    }
  }

  shuffle(imageGridContent.images);

  return imageGridContent;
}

function pickRandomPictures(species: Species): number[] {
  let numbers: number[] = [];
  while (numbers.length != 3) {
    const number = Math.floor(Math.random() * ANIMAL_SPECIES[species]) + 1;
    if (numbers.includes(number)) {
      continue;
    }
    numbers.push(number);
  }
  return numbers;
}

function shuffle<T>(array: T[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}
