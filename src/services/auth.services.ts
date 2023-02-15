/** Libraries */
import * as bcrypt from 'bcrypt'

/** Models */
import UserModel from '../models/user.models'

/** Utils */
import { generateToken, googleVerify } from '../utils'

/** Interfaces / Types */
import { type User } from '../interfaces/user.interface'
import {
  type LoginBody,
  type RegisterBody,
  type AuthReturnType,
  type GooglePayload,
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

export const googleLoginService = async (
  id_token: string
): Promise<AuthReturnType> => {
  const credential = (await googleVerify(id_token)) as unknown as GooglePayload

  if (!credential) throw new Error('Google verification has failed!')

  const { email, given_name } = credential

  try {
    const user = await UserModel.findOne({ email })

    if (user == null) {
      const data = {
        name: given_name,
        username: given_name,
        email,
        password: ':P',
      }

      const userNew = new UserModel(data)

      const userNewFinish = await userNew.save()

      const token = generateToken(userNewFinish.email)

      return {
        user: userNewFinish,
        token,
      }
    }

    const token = generateToken(user.email)

    return {
      user,
      token,
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
