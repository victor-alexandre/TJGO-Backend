const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Garçom Eletrônico',
      version: '1.0.0',
      description: 'Documentação da API para o sistema de Garçom Eletrônico',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Ajuste a porta conforme seu index.js
        description: 'Servidor Local',
      },
    ],
  },
  // Aqui indicamos onde o Swagger deve procurar as anotações (nos seus arquivos de rota)
  apis: [
      './src/swagger/swagger.yaml', 
      './src/swagger/components/*.yaml', 
      './src/swagger/paths/*.yaml'
    ],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;