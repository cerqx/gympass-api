import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findByEmail(email: String): Promise<User | null>
  findById(id: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
