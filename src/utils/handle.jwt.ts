/** Libraries */
import { sign, verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET ?? 'token.01010101'

/** Interfaces */
interface VerifyTokenType {
  email: string
  iat: number
}

export const generateToken = (email: string): string => {
  const jwt = sign({ email }, JWT_SECRET, {
    expiresIn: '4h',
  })
  return jwt
}

export const verifyToken = (jwt: string): VerifyTokenType => {
  const isOk = verify(jwt, JWT_SECRET) as VerifyTokenType
  return isOk
}
