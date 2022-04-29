import { setupWorker } from 'msw'
import { handlers } from './spec';

export const serviceWorker = setupWorker(...handlers());
