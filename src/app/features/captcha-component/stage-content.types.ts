import { ArithmeticContent } from './arithmetic/arithmetic-generator';
import { ImageGridContent } from './image-grid/image-grid-generator';
import { TextRepeatContent } from './text-repeat/text-repeat-generator';

export type StageContent = ImageGridContent | TextRepeatContent | ArithmeticContent; 