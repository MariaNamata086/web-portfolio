import type { ComponentType } from 'react';
import Measured from './i-measured-my-own-site';

// Add a line here when a post is published.
export const bodies: Record<string, ComponentType> = {
  'i-measured-my-own-site': Measured,
};
