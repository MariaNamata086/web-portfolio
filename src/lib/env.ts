// All optional. Missing keys degrade to a handled error, not a broken page.
export const env = {
  anthropicKey: process.env.ANTHROPIC_API_KEY,
} as const;

export const chatEnabled = Boolean(env.anthropicKey);
