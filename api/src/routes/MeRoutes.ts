import { prisma } from '../prisma';
import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify'
import { email, z } from 'zod'

export const healthResponseSchema = z.object({
  status: z.literal("ok"),
  environment: z.string(),
  uptime: z.number(),
  services: z.object({
    api: z.literal("up"),
    database: z.literal("up")
  }),
  timestamp: z.string()
});

export async function MeRoutes(
  fastify: FastifyInstance
) {
  fastify.get(
    "/me",
    {
      schema: {
        tags: ['Sobre'],
        description: 'Sobre a API',
        response: {
          200: z.object({
            name: z.string(),
            description: z.string(),

            application: z.object({
              backend: z.string(),
              frontend: z.string(),
              database: z.string()
            }),

            stack: z.object({
              runtime: z.string(),
              framework: z.string(),
              language: z.string(),
              orm: z.string(),
              validation: z.string(),
              authentication: z.string(),
              security: z.string(),
              documentation: z.array(z.string())
            }),

            devops: z.object({
              containerization: z.string(),
              orchestration: z.string(),
              infrastructure: z.string(),
              reverseProxy: z.string(),
              ssl: z.string(),
              dns: z.string()
            }),

            containers: z.array(z.string()),

            features: z.array(z.string()),

            securityDetails: z.string(),
            architecture: z.string(),
            purpose: z.string()
          })
        },
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return reply.send({
        name: "DeltaCodeCrafter API",
        description: "Esta API foi desenvolvida como backend principal do site deltacodecrafter.com, sendo uma aplicação real em produção, com foco em boas práticas de desenvolvimento, segurança, escalabilidade e processos de DevOps.",
        application: {
          backend: "API REST desenvolvida em Node.js com Fastify e TypeScript",
          frontend: "Aplicação web desenvolvida em Next.js",
          database: "PostgreSQL"
        },
        stack: {
          runtime: "Node.js",
          framework: "Fastify",
          language: "TypeScript",
          orm: "Prisma ORM",
          validation: "Zod com fastify-type-provider-zod",
          authentication: "JWT (JSON Web Token)",
          security: "bcryptjs para hash de senhas",
          documentation: [
            "@fastify/swagger",
            "@scalar/fastify-api-reference"
          ]
        },
        devops: {
          containerization: "Docker",
          orchestration: "Docker Compose",
          infrastructure: "VPS na Hostinger",
          reverseProxy: "Nginx",
          ssl: "Certificado SSL gerado via Certbot",
          dns: "Gerenciamento de domínio via Cloudflare"
        },
        containers: [
          "Nginx (proxy reverso)",
          "API Node.js (Fastify)",
          "FrontendNext.js",
          "PostgreSQL"
        ],
        features: [
          "Arquitetura full stack containerizada",
          "Autenticação e autorização via JWT",
          "Criptografia de senhas com bcryptjs",
          "Validação de dados com Zod",
          "Documentação automática da API",
          "Proxy reverso com Nginx",
          "Comunicação segura via HTTPS (SSL)"
        ],
        securityDetails: "A aplicação utiliza HTTPS com SSL válido, autenticação stateless com JWT e armazenamento seguro de credenciais com bcryptjs. O acesso aos serviços é controlado via proxy reverso, evitando exposição direta dos containers.",
        architecture: "O projeto segue uma arquitetura modular e desacoplada, separando responsabilidades entre frontend, backend, banco de dados e infraestrutura. Todo o ambiente é provisionado via Docker, facilitando deploy, replicação e escalabilidade.",
        purpose: "Esta aplicação é utilizada em produção como base do meu portfólio profissional, servindo como vitrine técnica para apresentação de soluções reais e competências em desenvolvimento full stack, backend e DevOps."
      });
    });
  fastify.get(
    "/health",
    {
      schema: {
        response: {
          200: healthResponseSchema
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await prisma.$queryRaw`SELECT 1`;

      return reply.send({
        status: "ok",
        environment: process.env.NODE_ENV ?? "development",
        uptime: process.uptime(),
        services: {
          api: "up",
          database: "up"
        },
        timestamp: new Date().toISOString()
      })
    }
  )
}