import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifyCors } from '@fastify/cors'
import ScalarApiReference from '@scalar/fastify-api-reference'
import { router } from './router'

const app = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>()

const start = async () => {
  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  await app.register(fastifyCors, {
    origin: true, //Permite requisições de qualquer lugar
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  })

  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'API de Teste no Docker',
        description: 'Essa API é uma API de teste criada por Andre Lucas Trevizan',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  })

  await app.register(ScalarApiReference, {
    routePrefix: '/docs',
  })

  await app.register(router)

  try {
    app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
      console.log('🚀 HTTP server running on http://localhost:3333')
      console.log('📚 Docs available at http://localhost:3333/docs')
    })
  } catch (error) {
    console.log(error)
  }
}

start()
