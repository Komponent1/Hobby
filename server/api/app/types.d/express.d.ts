import router from '../router/router'

declare global {
  namespace Express {
    interface Request {
      payload?: any
    }
  }
}
