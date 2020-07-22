import swaggerDocs from "swagger-jsdoc";
import { ServerConfig } from "../constants/secret";

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "API Docs",
            version: "1.0.0",
            description: "Handmade project API",
            servers: [ServerConfig.HOST],
        },
        basePath: "/api/v1",
    },
    apis: ["./src/app/modules/**/*.routes.js", "./src/app/modules/swagger.def.js"],
};

export default swaggerDocs(swaggerOptions);
