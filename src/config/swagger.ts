import swaggerJsDoc from 'swagger-jsdoc'



export const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Finsight Api',
      version: '1.0.1',
      description: 'Backend API documentation for FinsightFinance Tracker'
    },
  },
  apis: ['./src/routes/*.ts']
})





