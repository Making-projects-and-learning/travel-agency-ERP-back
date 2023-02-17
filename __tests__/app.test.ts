/** Libraries */
import request from 'supertest'

/** Application */
import server from '../src/Server'

describe('Auth', () => {
  let app: any

  beforeAll(async () => {
    app = await new server()
  })

  afterAll(async () => {
    await app.disconnect()
  })
  test('The route /api/auth/ping should exist.', async () => {
    const resp = await request(app.app).get('/api/auth/ping').send()
    // console.log(resp)
    expect(resp.status).toBe(200)
  })
})
