import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateInterfaceRequest {
  email: string
  password: string
}

interface AuthenticateInterfaceResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateInterfaceRequest): Promise<AuthenticateInterfaceResponse> {
    const user = await this.usersRepository.findByEmail(email)
    console.log(user)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordsMatches = await compare(password, user.password_hash)

    if (!doesPasswordsMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
