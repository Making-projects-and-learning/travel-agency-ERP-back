/** Libraries */
import { type Application, type Request, type Response } from 'express'

import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

/** Utils */
import { log } from './logger'

// Basic Meta Informations about our API
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Travel agency SERVER',
      version: '1.0.0',
      description:
        'This is a travel agency ERP server application made with Express and documented with Swagger',
      // license: {
      //     name: "MIT",
      //     url: "https://spdx.org/licenses/MIT.html",
      // },
      contact: {
        name: 'Lucas Gabriel Ojeda',
        url: 'https://lucasgabrielojeda.netlify.app/',
        email: 'ojedalucasgabriel2@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8080/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',
          name: 'x-token',
          scheme: 'bearer',
          in: 'header',
        },
      },
    },
    security: [
      {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    ],
  },
  apis: ['./src/routes/auth.routes.ts'],
}

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options)

// Function to setup our docs
export const swaggerDocs = (app: Application): void => {
  // Route-Handler to visit our docs
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  // Make our docs in JSON format available
  app.get('/api/docs.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
  log.info('Swagger docs are available on /api/docs')
}
