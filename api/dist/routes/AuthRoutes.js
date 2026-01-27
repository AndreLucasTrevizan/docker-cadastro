"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = AuthRoutes;
const zod_1 = require("zod");
async function AuthRoutes(fastify, options) {
    fastify.get('/auth/check', {
        schema: {
            tags: ['Autenticação'],
            description: 'Checando Funcionamento da API',
            response: {
                200: zod_1.z.object({
                    message: zod_1.z.string()
                })
            },
        },
    }, async (request, reply) => {
        return reply.send({ message: 'Check ok' });
    });
    fastify.post("/auth/sign_in", {
        schema: {
            tags: ['Autenticação'],
            description: 'Login do usuário',
            body: zod_1.z.object({
                email: zod_1.z.email(),
                password: zod_1.z.string().min(6)
            }),
            response: {
                200: zod_1.z.object({
                    token: zod_1.z.string()
                })
            }
        }
    }, async (request, reply) => {
        return reply.send({ token: "123@abc" });
    });
}
