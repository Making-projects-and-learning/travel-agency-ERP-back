/** Libraries */
import { OAuth2Client, type TokenPayload } from 'google-auth-library'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const googleVerify = async (
  idToken: string
): Promise<TokenPayload | undefined> => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  })
  const payload = ticket.getPayload()
  return payload
}
