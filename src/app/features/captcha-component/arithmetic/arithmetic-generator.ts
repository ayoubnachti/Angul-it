export interface ArithmeticContent {
  type: 'arithmetic';
  operandA: number;
  operandB: number;
  operator: '+' | '-' | '*';
  answer: number;
}

const OPERATORS = ['+', '-', '*'] as const;
type Operator = (typeof OPERATORS)[number];

const MIN_OPERAND = 1;
const MAX_OPERAND = 20;

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function computeAnswer(a: number, b: number, operator: Operator): number {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
  }
}

export function generateArithmeticContent(): ArithmeticContent {
  const operator = OPERATORS[randomInt(0, OPERATORS.length - 1)];

  const maxOperand = operator === '*' ? 12 : MAX_OPERAND;

  let operandA = randomInt(MIN_OPERAND, maxOperand);
  let operandB = randomInt(MIN_OPERAND, maxOperand);

  if (operator === '-' && operandB > operandA) {
    [operandA, operandB] = [operandB, operandA];
  }

  return {
    type: 'arithmetic',
    operandA,
    operandB,
    operator,
    answer: computeAnswer(operandA, operandB, operator),
  };
}
