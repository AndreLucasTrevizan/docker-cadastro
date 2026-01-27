import { FastifyInstance } from 'fastify'
import { MeRoutes } from './routes/MeRoutes'
//import { AuthRoutes } from './routes/AuthRoutes'

export async function router(fastify: FastifyInstance) {
  //fastify.register(AuthRoutes)
  fastify.register(MeRoutes)
}
