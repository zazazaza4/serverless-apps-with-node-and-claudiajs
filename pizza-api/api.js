const Api = require('claudia-api-builder');
const api = new Api();

const getPizzas = require('./handlers/get-pizzas.js');
const createOrder = require('./handlers/create-order.js');
const deleteOrder = require('./handlers/delete-order.js');
const updateOrder = require('./handlers/update-order.js');

api.get('/', () => 'Welcome to Pizza API');

api.get('/pizzas', () => {
  return getPizzas();
});

api.get(
  '/pizzas/{id}',
  (request) => {
    const pizzaId = request.pathParams.id;
    return getPizzas(pizzaId);
  },
  {
    error: 404,
  }
);

api.post(
  '/orders',
  (request) => {
    return createOrder(request.body);
  },
  {
    success: 201,
    error: 400,
  }
);

api.put(
  '/orders/{id}',
  (request) => {
    const id = request.pathParams.id;
    return updateOrder(id, request.body);
  },
  {
    error: 400,
  }
);

api.delete(
  '/orders/{id}',
  (request) => {
    const id = request.pathParams.id;
    return deleteOrder(id);
  },
  {
    error: 400,
  }
);

module.exports = api;
