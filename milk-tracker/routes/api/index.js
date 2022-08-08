'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', {
    schema: {
      description: 'This is an endpoint for application health check',
      tags: ['health'],
      response: {
        200: {
          description: 'Success Response',
          type: 'object',
          properties: {
            endpoint: { type: 'string' },
            version: { type: 'string' },
            status: { type: 'boolean' }
          }
        }
      }
    }
  }, async function (request, reply) {
    return { endpoint: "api", version: "v1", status: true }
  })

}
