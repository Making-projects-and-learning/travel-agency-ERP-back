/** Interfaces */
import { type User } from './user.interface'

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
