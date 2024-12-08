const express = require('express');
const router = express.Router();
const order = require('../controllers/orderManagement');

/** 
* @swagger
* tags:
*   name: Order Item Management
*   description: Routes for managing order items
*/

/**
 * @swagger
 * /orders:
 *   get:
 *     tags: [Order Management]
 *     description: Retrieve a list of all orders
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: A list of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   order_id:
 *                     type: integer
 *                     example: 1
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   order_date:
 *                     type: timestamp
 *                     example: 2024-12-07 12:00:00
 *                   order_status:
 *                     type: string
 *                     enum: [preparing, ready, completed]
 *                     example: preparing
 *                   updated_at:
 *                     type:  timestamp
 *                     example: 2024-12-07 12:00:00
 *  
 */
router.get('/api/orders/', order.getAllOrders);

/**
 * @swagger
 * /orders/{user_id}:
 *   get:
 *     tags: [Order Management]
 *     description: Retrieve a list of all orders given a user id
 *     summary: Get all orders by user id
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *     responses:
 *       200:
 *         description: A list of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   order_id:
 *                     type: integer
 *                     example: 1
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   order_date:
 *                     type: timestamp
 *                     example: 2024-12-07 12:00:00
 *                   order_status:
 *                     type: string
 *                     enum: [preparing, ready, completed]
 *                     example: preparing
 *                   updated_at:
 *                     type:  timestamp
 *                     example: 2024-12-07 12:00:00
 *  
 */
router.get('/api/orders/:user_id', order.getAllOrdersByUserId);


/**
 * @swagger
 * /orders/add-order/{user_id}:
 *    post:
 *     tags: [Order Management]
 *     description: Create a new order
 *     summary: Add a new order
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             order_items:
 *               type: integer[]
 *               example: [1, 2, 3] 
 *     responses:
 *       201:
 *         description: Order created successfully.
 *         content:
 *          application/json:
 *              schema:
*                 type: object
*                 properties:
*                   order_id:
*                     type: integer
*                     example: 1
*                   user_id:
*                     type: integer
*                     example: 1
*                   order_date:
*                     type: timestamp
*                     example: 2024-12-07 12:00:00
*                   order_items:
*                     type: array
*                     example: [1, 2, 3] 
*                   order_status:
*                     type: string
*                     enum: [preparing, ready, completed]
*                     example: preparing
*                   updated_at:
*                     type:  timestamp
*                     example: 2024-12-07 12:00:00
 *       400:
 *         description: User id is required
 *       500:
 *          description: Internal server error
 */
router.post('/api/orders/add-order/:user_id', order.createOrder);


/**
 * @swagger
 * /orders/update-order-status/:
 *   put:
 *     tags: [Order Management]
 *     description: Update an order status
 *     summary: Update an order status
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                order_id:
 *                 type: integer
 *                 example: 1
 *                order_status:
 *                  type: string
 *                  enum: [preparing, ready, completed] 
 *     responses:
 *       201:
 *         description: Order status updated successfully.
 *       400:
 *         description: Order id and order status are required
 *       500:
 *          description: Internal server error
 */
router.put('/api/orders/update-order-status', order.updateOrderStatus);

module.exports = router;