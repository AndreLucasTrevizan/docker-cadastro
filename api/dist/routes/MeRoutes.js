"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthResponseSchema = void 0;
exports.MeRoutes = MeRoutes;
const prisma_1 = require("@/prisma");
const zod_1 = require("zod");
exports.healthResponseSchema = zod_1.z.object({
    status: zod_1.z.literal("ok"),
    environment: zod_1.z.string(),
    uptime: zod_1.z.number(),
    services: zod_1.z.object({
        api: zod_1.z.literal("up"),
        database: zod_1.z.literal("up")
    }),
    timestamp: zod_1.z.string()
});
async function MeRoutes(fastify) {
    fastify.get("/me", {
        schema: {
            tags: ['Sobre'],
            description: 'Sobre a API',
            response: {
                200: zod_1.z.object({
                    name: zod_1.z.string(),
                    description: zod_1.z.string(),
                    application: zod_1.z.object({
                        backend: zod_1.z.string(),
                        frontend: zod_1.z.string(),
                        database: zod_1.z.string()
                    }),
                    stack: zod_1.z.object({
                        runtime: zod_1.z.string(),
                        framework: zod_1.z.string(),
                        language: zod_1.z.string(),
                        orm: zod_1.z.string(),
                        validation: zod_1.z.string(),
                        authentication: zod_1.z.string(),
                        security: zod_1.z.string(),
                        documentation: zod_1.z.array(zod_1.z.string())
                    }),
                    devops: zod_1.z.object({
                        containerization: zod_1.z.string(),
                        orchestration: zod_1.z.string(),
                        infrastructure: zod_1.z.string(),
                        reverseProxy: zod_1.z.string(),
                        ssl: zod_1.z.string(),
                        dns: zod_1.z.string()
                    }),
                    containers: zod_1.z.array(zod_1.z.string()),
                    features: zod_1.z.array(zod_1.z.string()),
                    securityDetails: zod_1.z.string(),
                    architecture: zod_1.z.string(),
                    purpose: zod_1.z.string()
                })
            },
        }
    }, async (request, reply) => {
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
    fastify.get("/health", {
        schema: {
            response: {
                200: exports.healthResponseSchema
            }
        }
    }, async (request, reply) => {
        await prisma_1.prisma.$queryRaw `SELECT 1`;
        return reply.send({
            status: "ok",
            environment: process.env.NODE_ENV ?? "development",
            uptime: process.uptime(),
            services: {
                api: "up",
                database: "up"
            },
            timestamp: new Date().toISOString()
        });
    });
}
