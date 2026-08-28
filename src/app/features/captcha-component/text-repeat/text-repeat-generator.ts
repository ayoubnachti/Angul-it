export interface TextRepeatContent {
  type: 'text-repeat';
  challengeText: string;
}

const CHAR_POOL =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export const CHALLENGE_LENGTH = 8;

export function generateTextRepeatContent(): TextRepeatContent {
  let challengeText = '';
  for (let i = 0; i < CHALLENGE_LENGTH; i++) {
    const index = Math.floor(Math.random() * CHAR_POOL.length);
    challengeText += CHAR_POOL[index];
  }

  return { type: 'text-repeat', challengeText };
}