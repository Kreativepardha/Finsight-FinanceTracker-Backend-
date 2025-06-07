import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FinSight API Documentation',
      version: '1.0.0',
      description: 'API documentation for the FinSight Personal Finance Tracker',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Transaction: {
          type: 'object',
          required: ['amount', 'description', 'date'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'The transaction ID',
            },
            amount: {
              type: 'number',
              description: 'The transaction amount',
            },
            description: {
              type: 'string',
              description: 'The transaction description',
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'The transaction date',
            },
            category: {
              type: 'string',
              enum: ['Food', 'Rent', 'Travel', 'Groceries', 'Subscriptions', 'other'],
              description: 'The transaction category',
            },
          },
        },
        Budget: {
          type: 'object',
          required: ['category', 'amount', 'month', 'year'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'The budget ID',
            },
            category: {
              type: 'string',
              enum: ['Food', 'Rent', 'Travel', 'Groceries', 'Subscriptions', 'other'],
              description: 'The budget category',
            },
            amount: {
              type: 'number',
              description: 'The budget amount',
            },
            month: {
              type: 'integer',
              minimum: 1,
              maximum: 12,
              description: 'The budget month (1-12)',
            },
            year: {
              type: 'integer',
              description: 'The budget year',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes
}

export const swaggerSpec = swaggerJsdoc(options)





