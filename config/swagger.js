const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'jWallet Lite API Documentation',
      version: '1.0.0',
      description: 'Mock REST API backend for jWallet Lite Flutter application assignment',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Local Development Server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter mock token: mock_access_token_123',
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Routes file se JSDoc comments read karega
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📄 Swagger Docs available at http://localhost:3000/api-docs');
};

module.exports = setupSwagger;