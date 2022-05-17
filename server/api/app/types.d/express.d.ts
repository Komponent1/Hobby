import router from '../router/router'

declare global {
  namespace Express {
    interface Request {
      headers: {
        'X-User': string
      }
    }
  }
}
