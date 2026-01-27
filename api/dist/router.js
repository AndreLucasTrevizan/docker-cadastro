"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = router;
const MeRoutes_1 = require("./routes/MeRoutes");
//import { AuthRoutes } from './routes/AuthRoutes'
async function router(fastify) {
    //fastify.register(AuthRoutes)
    fastify.register(MeRoutes_1.MeRoutes);
}
