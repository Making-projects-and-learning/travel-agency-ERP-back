/** Interfaces */
import { type User } from './user.interface'

export interface GooglePayload {
  iss: string
  nbf: number
  aud: string
  sub: string
  email: string
  email_verified: boolean
  azp: string
  name: string
  picture: string
  given_name: string
  family_name: string
  iat: boolean
  exp: boolean
  jti: string
}

export interface LoginBody {
  username: string
  password: string
}

export interface RegisterBody {
  name: string
  username: string
  email: string
  password: string
}

export type AuthReturnType = {
  user: Partial<User>
  token: string
} | null
