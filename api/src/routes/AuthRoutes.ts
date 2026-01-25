import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify'
import { email, z } from 'zod'

export async function AuthRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get(
    '/auth/check',
    {
      schema: {
        tags: ['Autenticação'],
        description: 'Checando Funcionamento da API',
        response: {
          200: z.object({
            message: z.string()
          })
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return reply.send({ message: 'Check ok' })
    },
  )

  fastify.post("/auth/sign_in", {
    schema: {
      tags: ['Autenticação'],
      description: 'Login do usuário',
      body: z.object({
        email: z.email(),
        password: z.string().min(6)
      }),
      response: {
        200: z.object({
          token: z.string()
        })
      }}
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return reply.send({ token: "123@abc" })
    }
  )
}
