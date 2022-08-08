const { default: fastify } = require('fastify');
const fp = require('fastify-plugin');

const OrderService = (fastify, db, uuidv4) => {
    const BASE_PRICE = 50
    const BASE_MAX_CAPACITY = 1000
    let dayMaxCapacity = 1000

    let mock_orders_db = [
        {
            'id': uuidv4(),
            'order_date': new Date().toISOString().split("T")[0].trim(),
            'status': 'placed',
            'quantity': 5,
            'price': 5 * BASE_PRICE
        }, {
            'id': uuidv4(),
            'order_date': new Date().toISOString().split("T")[0].trim(),
            'status': 'placed',
            'quantity': 4,
            'price': 4 * BASE_PRICE
        }, {
            'id': uuidv4(),
            'order_date': new Date().toISOString().split("T")[0].trim(),
            'status': 'placed',
            'quantity': 6,
            'price': 6 * BASE_PRICE
        }
    ]

    const createOrderHelper = (quantity) => {
        return {
            'id': uuidv4(),
            'order_date': new Date().toISOString().split("T")[0].trim(),
            'status': 'placed',
            'quantity': quantity,
            'price': quantity * BASE_PRICE
        }
    }

    fastify.decorate('orders_db', mock_orders_db)
    fastify.decorate('dayMaxCapacity', dayMaxCapacity)

    function get_date(query_date = null) {
        if (query_date) {
            return new Date(query_date).toISOString().split("T")[0].trim()
        }
        return new Date().toISOString().split("T")[0].trim()
    }

    const createOrder = async (quantity) => {
        if (quantity
            && parseInt(quantity)
            && parseInt(quantity) >= 1) {
            const nQuant = fastify.dayMaxCapacity - quantity
            if (nQuant <= 0) {
                throw new Error("Oops!! we are out of stock for the day")
            } else {
                const _order = createOrderHelper(quantity)
                fastify.orders_db.push(_order)
                fastify.dayMaxCapacity -= quantity
                
                return _order
            }
        } else {
            throw new Error(`Invalid 'Quantity'`)
        }
    }

    const getAllOrders = async () => {
        return fastify.orders_db;
    }

    const getOrderById = (id) => {
        if (id) {
            return fastify.orders_db.find((i) => i.id === id)
        } else {
            throw new Error(`Invalid 'Id'`)
        }
    }

    const getOrderByDate = (date) => {
        if (!date) {
            throw new Error("Invalid 'Date' recieved")
        }
        const _date = get_date(date)

        const quantities = fastify.orders_db.filter((i) => i.order_date === _date).map(i => i.quantity)

        return quantities;
    }

    const checkCapacity = async (date) => {
        const orderQuantities = getOrderByDate(date)
        let sumQuantities = 0
        orderQuantities.forEach((element) => {
            sumQuantities += parseInt(element)
        });

        return BASE_MAX_CAPACITY - sumQuantities
    }

    const updateOrder = (id, quantity) => {
        if (id && quantity) {
            const price = quantity * BASE_PRICE
            const orderIdx = fastify.orders_db.findIndex(i => i.id === id);

            if (orderIdx <= -1) {
                throw new Error(`Invalid 'Id', not found`)
            } else {
                fastify.orders_db[orderIdx].quantity = quantity
                fastify.orders_db[orderIdx].price = price
            }

            return fastify.orders_db[orderIdx]
        } else {
            throw new Error(`Invalid 'ID' or 'Quantity'`)
        }
    }

    const updateOrderStatus = (id, status) => {
        if (status
            && (status.trim() === "placed"
                || status.trim() === "packed"
                || status.trim() === "dispatched"
                || status.trim() === "delivered")) {
            const orderIdx = fastify.orders_db.findIndex(i => i.id === id);

            if (orderIdx <= -1) {
                throw new Error(`Invalid 'Id', not found`)
            } else {
                fastify.orders_db[orderIdx].status = status
            }

            return fastify.orders_db[orderIdx]
        } else {
            
            throw new Error(`Invalid 'Status'`)
        }
    }

    const deleteOrder = async (id) => {
        if (id) {
            const orderIdx = fastify.orders_db.findIndex(i => i.id === id);

            if (orderIdx <= -1) {
                throw new Error(`Invalid 'Id', not found`)
            } else {
                fastify.orders_db.splice(orderIdx, 1)
            }
        } else {
            throw new Error(`Invalid 'Id'`)
        }
    }

    return {
        createOrder,
        getAllOrders,
        getOrderById,
        getOrderByDate,
        checkCapacity,
        updateOrder,
        updateOrderStatus,
        deleteOrder,
    }
}

module.exports = fp((fastify, options, next) => {

    fastify.decorate('orderService', OrderService(fastify, fastify.db, fastify.uuidv4))
    next()
})
