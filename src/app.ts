/** Libraries */
import express, { type Express } from 'express'
import 'dotenv/config'
import cors from 'cors'
import chalk from 'chalk'
import logger from 'morgan'

/** Database */
import { dbConnect } from './config'

/** Routes */
import { authRouter } from './routes'

/** Interfaces */
import { type User } from './interfaces/user.interface'

/** Utils */
import { log, swaggerDocs } from './utils'

declare global {
  namespace Express {
    interface Request {
      user?: User | any
      email?: string
    }
  }
}

export default class Server {
  private readonly app: Express
  private readonly port: string
  private readonly apiPaths = {
    auth: '/api/auth',
  }

  constructor() {
    this.app = express()
    this.port = process.env.PORT ?? '8080'

    // Initial methods
    this.dbConnection()
    this.middlewares()
    this.routes()
  }

  async dbConnection() {
    await dbConnect()
  }

  middlewares() {
    this.app.use(cors())

    this.app.use(logger('dev'))

    this.app.use(express.json())

    this.app.use(express.static('public'))

    /** Swagger docs */
    swaggerDocs(this.app)
  }

  routes() {
    this.app.use(this.apiPaths.auth, authRouter)
  }

  listen() {
    this.app.listen(this.port, () => {
      log.info(
        `${chalk.white('Server listening on port')} ${chalk.cyan(this.port)}`
      )
    })
  }
}
