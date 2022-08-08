
const fp = require('fastify-plugin');
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');


module.exports = fp(function (fastify, opts, done) {
    fastify.decorate('uuidv4', uuidv4);
    done()
})