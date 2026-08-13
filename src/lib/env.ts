// All optional. Missing keys degrade to a handled error, not a broken page.
export const env = {
  anthropicKey: process.env.ANTHROPIC_API_KEY,
  resendKey: process.env.RESEND_API_KEY,
  contactTo: process.env.CONTACT_TO_EMAIL,
  contactFrom: process.env.CONTACT_FROM_EMAIL,
} as const;

export const chatEnabled = Boolean(env.anthropicKey);
export const contactEnabled = Boolean(env.resendKey && env.contactTo && env.contactFrom);
