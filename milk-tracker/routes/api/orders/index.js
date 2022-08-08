'use strict'

const orderServicePlugin = require('../../../services/orderService');

module.exports = async function (fastify, opts) {
  fastify.register(orderServicePlugin);

  fastify.get('/', async (request, reply) => {
    const orders = await fastify.orderService.getAllOrders();
    return orders;
  })

  fastify.get('/getAll', {
    schema: {
      description: 'This is an endpoint for fetching all orders',
      tags: ['orders'],
      response: {
        200: {
          description: 'Success Response',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              order_date: { type: 'string' },
              status: { type: 'string' },
              quantity: { type: 'number' },
              price: { type: 'number' }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    const orders = await fastify.orderService.getAllOrders();
    return orders;
  })

  fastify.get('/get/:id', {
    schema: {
      description: 'This is an endpoint for fetching a order by id',
      tags: ['orders'],
      params: {
        description: 'Order Id',
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: {
          description: 'Success Response',
          type: 'object',
          properties: {
            id: { type: 'string' },
            order_date: { type: 'string' },
            status: { type: 'string' },
            quantity: { type: 'number' },
            price: { type: 'number' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const order = await fastify.orderService.getOrderById(id);
    return order;
  })

  fastify.get('/checkCapacity/:date', {
    schema: {
      description: 'This is an endpoint for fetching a Milk left per all orders for given date',
      tags: ['orders'],
      params: {
        description: 'Order Date',
        type: 'object',
        properties: {
          date: { type: 'string' }
        }
      },
      response: {
        200: {
          description: 'Success Response',
          type: 'number',
        }
      }
    }
  }, async (request, reply) => {
    const { date } = request.params;
    return await fastify.orderService.checkCapacity(date);
  })


  fastify.post('/add', {
    schema: {
      description: 'This is an endpoint for creating a new order',
      tags: ['orders'],
      body: {
        description: 'Payload for creating a new Order',
        type: 'object',
        properties: {
          quantity: { type: 'number' },
        }
      },
      response: {
        201: {
          description: 'Success Response',
          type: 'object',
          properties: {
            id: { type: 'string' },
            order_date: { type: 'string' },
            status: { type: 'string' },
            quantity: { type: 'number' },
            price: { type: 'number' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { quantity } = request.body;
    const newOrder = await fastify.orderService.createOrder(quantity)
    reply.code(201).send(newOrder)
  })


  fastify.put('/updateStatus/:id', {
    schema: {
      description: 'This is an endpoint for updating the status an existing order',
      tags: ['orders'],
      params: {
        description: 'Order Id',
        type: 'object',
        properties: {
          id: { type: 'string' },
        }
      },
      body: {
        description: 'Payload for updating a the status of an Order',
        type: 'object',
        properties: {
          status: { type: 'string' },
        }
      },
      response: {
        200: {
          description: 'Success Response',
          type: 'object',
          properties: {
            id: { type: 'string' },
            order_date: { type: 'string' },
            status: { type: 'string' },
            quantity: { type: 'number' },
            price: { type: 'number' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params
    const { status } = request.body

    const updatedOrder = await fastify.orderService.updateOrderStatus(id, status)
    return updatedOrder
  })


  fastify.put('/update/:id', {
    schema: {
      description: 'This is an endpoint for updating an existing order',
      tags: ['orders'],
      params: {
        description: 'Order Id',
        type: 'object',
        properties: {
          id: { type: 'string' },
        }
      },
      body: {
        description: 'Payload for updating an Order',
        type: 'object',
        properties: {
          quantity: { type: 'number' },
        }
      },
      response: {
        200: {
          description: 'Success Response',
          type: 'object',
          properties: {
            id: { type: 'string' },
            order_date: { type: 'string' },
            status: { type: 'string' },
            quantity: { type: 'number' },
            price: { type: 'number' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params
    const { quantity } = request.body;

    return await fastify.orderService.updateOrder(id, quantity)
  })

  fastify.delete('/delete/:id', {
    schema: {
      description: 'This is an endpoint for PERMANENTLY DELETING an existing order.',
      tags: ['orders'],
      params: {
        description: 'Order Id',
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        204: {
          type: 'string',
          default: 'No Content'
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params;
    await fastify.orderService.deleteOrder(id)
    reply.status(204)
  })

  fastify.get('/health', {
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
    return { endpoint: "orders", version: "v1", status: true }
  })
}
