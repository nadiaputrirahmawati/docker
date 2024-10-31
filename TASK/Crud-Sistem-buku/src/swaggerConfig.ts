// swaggerConfig.ts

const port = process.env.PORT || 4500;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Buku API',
            version: '1.0.0',
            description: 'API untuk manajemen data buku',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};
export default swaggerOptions;
