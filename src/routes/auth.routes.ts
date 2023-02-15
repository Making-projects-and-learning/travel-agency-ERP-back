/** Libraries */
import { type Request, type Response, Router } from 'express'
import { check } from 'express-validator'

/** Controllers */
import {
  login,
  register,
  googleSignIn,
  tokenRevalidate,
} from '../controllers/auth.controllers'

/** Middlewares */
import { validateFields, jwtValidate } from '../middleware'

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: mongoId
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: User name
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
 *         status:
 *           type: boolean
 *           description: If a user has been deleted or not
 *       example:
 *         _id: 63b8c81f8f354ed7be8f77b7
 *         name: test 1
 *         email: test1@gmail.com
 */
const router = Router()

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login on the application.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test1@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login success!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: OK
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 63b8c81f8f354ed7be8f77b7
 *                     name:
 *                       type: string
 *                       example: test 1
 *                     email:
 *                       type: string
 *                       example: test1@test.com
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjhjODFmOGYzNTRlZDdiZThmNzdiNyIsImlhdCI6MTY3MzE5NTI0NiwiZXhwIjoxNjczMjA5NjQ2fQ.fJEomtqUlwee4L07tdBu2YWOzkOz9snR6RrvpjAzvTc
 *       400:
 *         description: Some server error
 *
 */
router.post(
  '/login',
  [
    check(
      'username',
      'username is required and it must be at least 6 characters'
    ).isLength({
      min: 6,
    }),
    check(
      'password',
      'password is required and it must be at least 8 characters'
    ).isLength({
      min: 8,
    }),
    validateFields,
  ],
  login
)

router.post(
  '/register',
  [
    check('name', 'name is required').not().isEmpty(),
    check(
      'username',
      'username is required and it must be at least 6 characters long'
    ).isLength({
      min: 6,
    }),
    check('email', 'Email required and must be a valid email').isEmail(),
    check(
      'password',
      'Password is required and it must be at least 8 characters long'
    ).isLength({
      min: 8,
    }),
    validateFields,
  ],
  register
)

router.post(
  '/google',
  [check('id_token', 'id_token is required.').not().isEmpty(), validateFields],
  googleSignIn
)

router.get('/renew', [jwtValidate, validateFields], tokenRevalidate)

router.get('/ping', (_req: Request, res: Response) => {
  res.send('pong')
})

export { router as authRouter }
