/** Libraries */
import * as bcrypt from 'bcrypt'

/** Models */
import UserModel from '../models/user.models'

/** Utils */
import { generateToken } from '../utils'

/** Interfaces / Types */
import { type User } from '../interfaces/user.interface'
import {
  type LoginBody,
  type RegisterBody,
  type AuthReturnType,
} from '../interfaces/auth.interface'

export const loginService = async ({
  username,
  password,
}: LoginBody): Promise<AuthReturnType> => {
  const user: User | null = await UserModel.findOne({ username })
  if (user == null || !(await bcrypt.compare(password, user.password)))
    return null
  if (!process.env.JWT_SECRET) throw new Error('the jwt secret is undefined')
  const token = generateToken(user.email)
  const { password: pass, ...rest } = JSON.parse(JSON.stringify(user))
  return {
    user: rest,
    token,
  }
}

export const registerService = async ({
  name,
  username,
  email,
  password,
}: RegisterBody): Promise<AuthReturnType> => {
  const hashedPassword = await bcrypt.hash(
    password,
    process.env.BRYPT_SALT_OR_ROUNDS ?? 11
  )
  const newUser = new UserModel({
    name,
    username,
    email,
    password: hashedPassword,
  })
  if (!process.env.JWT_SECRET) throw new Error('the jwt secret is undefined!')
  try {
    const user: User = await newUser.save()
    const token = generateToken(user.email)
    const { password, ...rest } = JSON.parse(JSON.stringify(user))
    return {
      user: rest,
      token,
    }
  } catch (e) {
    return null
  }
}

export const renewService = async (user: User): Promise<AuthReturnType> => {
  const { email } = user

  const token = generateToken(email)

  return {
    user,
    token,
  }
}
