// export const loginService = async ({
//   username,
//   password,
// }: LoginBody): Promise<AuthReturnType> => {
//   const user: User | null = await UserModel.findOne({ username })
//   if (user == null || !(await bcrypt.compare(password, user.password)))
//     return null
//   if (!process.env.JWT_SECRET) throw new Error('the jwt secret is undefined')
//   const token = generateToken(user.email)
//   const { password: pass, ...rest } = JSON.parse(JSON.stringify(user))
//   return {
//     user: rest,
//     token,
//   }
// }
