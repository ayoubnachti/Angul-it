import { generateTextRepeatContent, CHALLENGE_LENGTH } from './text-repeat-generator';

const VALID_CHARS = /^[A-Za-z0-9!@#$%^&*]+$/;

describe('generateTextRepeatContent', () => {
  let textRepeatContent = generateTextRepeatContent();

  it(`should generate text with length ${CHALLENGE_LENGTH}`, () => {
    expect(textRepeatContent).toBeTruthy();
    expect(textRepeatContent.challengeText.length).toBe(CHALLENGE_LENGTH);
  });

  it('only uses characters from the valid pool', () => {
    const content = generateTextRepeatContent();
    expect(VALID_CHARS.test(content.challengeText)).toBe(true);
  });

  it('sets type to text-repeat', () => {
    const content = generateTextRepeatContent();
    expect(content.type).toBe('text-repeat');
  });

  it('generates different text across calls', () => {
    const a = generateTextRepeatContent();
    const b = generateTextRepeatContent();
    expect(a.challengeText).not.toBe(b.challengeText);
  });
});
