import { generateArithmeticContent } from './arithmetic-generator';

describe('generateArithmeticContent', () => {
  it('generates operandA and operandB within valid range', () => {
    const content = generateArithmeticContent();
    expect(content.operandA).toBeGreaterThanOrEqual(1);
    expect(content.operandB).toBeGreaterThanOrEqual(1);
  });

  it('sets type to arithmetic', () => {
    const content = generateArithmeticContent();
    expect(content.type).toBe('arithmetic');
  });

  it('picks a valid operator', () => {
    const content = generateArithmeticContent();
    expect(['+', '-', '*']).toContain(content.operator);
  });

  it('computes the correct answer for the given operands and operator', () => {
    const content = generateArithmeticContent();
    let expected: number;

    switch (content.operator) {
      case '+': expected = content.operandA + content.operandB; break;
      case '-': expected = content.operandA - content.operandB; break;
      case '*': expected = content.operandA * content.operandB; break;
    }

    expect(content.answer).toBe(expected);
  });
});