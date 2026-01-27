"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const swagger_1 = __importDefault(require("@fastify/swagger"));
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_api_reference_1 = __importDefault(require("@scalar/fastify-api-reference"));
const router_1 = require("./router");
const app = (0, fastify_1.default)({
    logger: true,
}).withTypeProvider();
const start = async () => {
    app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
    app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
    await app.register(cors_1.default, {
        origin: true, //Permite requisições de qualquer lugar
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    });
    await app.register(swagger_1.default, {
        openapi: {
            info: {
                title: 'Delta Code Crafter API',
                description: `API principal da Delta Code Crafter<br />
        <small>Criada por Andre Lucas Trevizan - Full Stack Dev</small>`,
                version: '1.0.0',
            },
        },
        transform: fastify_type_provider_zod_1.jsonSchemaTransform,
    });
    await app.register(fastify_api_reference_1.default, {
        routePrefix: '/docs',
    });
    await app.register(router_1.router);
    try {
        app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
            console.log('🚀 HTTP server running on http://localhost:3333');
            console.log('📚 Docs available at http://localhost:3333/docs');
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
