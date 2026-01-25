import { FastifyInstance } from 'fastify'
import { AuthRoutes } from './routes/AuthRoutes'

export async function router(fastify: FastifyInstance) {
  fastify.register(AuthRoutes)
}
