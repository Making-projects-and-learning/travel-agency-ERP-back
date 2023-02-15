/** Libraries */
import request from 'supertest'

/** Application */
import server from '../src/app'

describe('Auth', () => {
  let app: any

  beforeAll(async () => {
    app = await new server()
  })

  afterAll(async () => {
    // process.exit(0)
  })
  test('The route /api/auth/ping should exist.', async () => {
    const resp = await request(app.app).get('/api/auth/ping').send()
    expect(resp.status).toBe(200)
  })
})
