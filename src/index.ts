import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { DietController } from './diet/controller';

// Inizializza app Hono con OpenAPI
const app = new OpenAPIHono();

// Abilita CORS
app.use('*', cors());

// Carica i dati della dieta
const dietData = require('./diet-data.json');

// Carica il controller della dieta
const dietController = new DietController(dietData);

// Integra le route del controller
app.route('/', dietController.router);

// Documentazione OpenAPI
app.get('/ui', swaggerUI({ url: '/doc' }));

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    title: 'API Piano Dietetico',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:8787',
      description: 'Development server',
    },
  ],
});

export default app;
