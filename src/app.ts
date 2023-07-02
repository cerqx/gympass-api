import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
prisma.user.create({
  data: {
    name: 'João Victor',
    email: 'contatocerq@gmail.com',
  },
})

export const app = fastify()
