import { authMiddleware } from '../middleware';

declare global {
  namespace Express {
    interface Request {
      payload?: any
    }
  }
}
