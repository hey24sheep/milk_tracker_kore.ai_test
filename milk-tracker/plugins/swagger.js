const fp = require('fastify-plugin')

module.exports = fp(async function(fastify, opts) {
    fastify.register(require('@fastify/swagger'), {
        routePrefix: '/docs',
        swagger: {
          info: {
            title: 'API Documentation',
            description: 'Fastify API Docs for Milk Tracker Kore.AI',
            version: '0.1.0'
          },
          externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
          },
          host: 'localhost:3000',
          schemes: ['http', 'https'],
          consumes: ['application/json'],
          produces: ['application/json'],
        },
        exposeRoute: true
      })
})
