/** Libraries */
import { type Request, type Response } from 'express'

/** Services */
import {
  loginService,
  registerService,
  googleLoginService,
  renewService,
} from '../services/auth.services'

/** Utils */
import { handleError } from '../utils'

export const login = async (req: Request, res: Response): Promise<void> => {
  const data = await loginService(req.body)
  if (data == null) {
    handleError(res, 'Inavlid username or password', {}, 403)
    return
  }
  const { user, token } = data
  res.status(200).json({
    message: 'user logged in yey',
    user,
    token,
  })
}

export const register = async (req: Request, res: Response): Promise<void> => {
  const data = await registerService(req.body)
  if (data == null) {
    handleError(res, 'Something Went Wrong', {}, 400)
    return
  }
  const { user, token } = data
  res.status(200).json({
    message: 'user signned up',
    user,
    token,
  })
}

export const googleSignIn = async (
  { body: { id_token } }: Request,
  res: Response
) => {
  const data = await googleLoginService(id_token)
  if (data == null) {
    handleError(res, 'Something Went Wrong', {}, 400)
    return
  }
  const { user, token } = data
  res.status(200).json({
    message: 'user logged with google',
    user,
    token,
  })
}

export const tokenRevalidate = async (req: Request, res: Response) => {
  const data = await renewService(req.user[0])
  if (data == null) {
    handleError(res, 'Something Went Wrong', {}, 400)
    return
  }
  const { user, token } = data
  res.status(200).json({
    message: 'token renewed',
    user,
    token,
  })
}
