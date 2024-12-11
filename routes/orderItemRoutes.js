const express = require('express');
const router = express.Router();
const orderItem = require('../controllers/orderItemManagement');

/**
 * @swagger
 * tags:
 *   name: Order Management
 *   description: Routes for managing orders
 */

/**
 * @swagger
 * /orderitems:
 *   get:
 *     tags: [Order Item Management]
 *     description: Retrieve a list of all order items
 *     summary: Get all order items
 *     responses:
 *       200:
 *         description: A list of all order items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   orderitem_id:
 *                     type: integer
 *                     example: 1
 *                   order_id:
 *                     type: integer
 *                     example: 1
 *                   menuitem_id:
 *                     type: integer
 *                     example: 1
 *                   extra_toppings:
 *                     type: string[]
 *                     example: ["cheese"]
 *                   quantity:
 *                     type: integer
 *                     example: 1
 *  
 */
router.get('/api/orderitems', orderItem.getAllOrderItems);

/**
 * @swagger
 * /orderitems/{order_id}:
 *   get:
 *     tags: [Order Item Management]
 *     description: Retrieve a list of all order items with a given order id
 *     summary: Get all order items with a given order id
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *     responses:
 *       200:
 *         description: A list of all order items by order id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   orderitem_id:
 *                     type: integer
 *                     example: 1
 *                   order_id:
 *                     type: integer
 *                     example: 1
 *                   menuitem_id:
 *                     type: integer
 *                     example: 1
 *                   extra_toppings:
 *                     type: string[]
 *                     example: ["cheese"]
 *                   quantity:
 *                     type: integer
 *                     example: 1
 *  
 */
router.get('/api/orderitems/:order_id', orderItem.getAllOrderItemsByOrderId);

/**
 * @swagger
 * /orderitems/create-orderitem:
 *   post:
 *     tags: [Order Item Management]
 *     description: Create a new order item
 *     summary: Create a new order item
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *              type: object
 *              properties:
 *                order_id:
 *                   type: integer
 *                   example: 1
 *                cart_id:
 *                   type: integer
 *                   example: 1
 *                menuitem_id:
 *                   type: integer
 *                   example: 1
 *                extra_toppings:
 *                   type: string[]
 *                   example: ["cheese"]
 *                quantity:
 *                   type: integer
 *                   example: 1
 *     responses:
 *       201:
 *         description: A new order item has been created
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   orderitem_id:
 *                     type: integer
 *                     example: 1
 *                   cart_id:
 *                     type: integer
 *                     example: 1
 *                   menuitem_id:
 *                     type: integer
 *                     example: 1
 *                   extra_toppings:
 *                     type: string[]
 *                     example: ["cheese"]
 *                   quantity:
 *                     type: integer
 *                     example: 1
 *  
 */
router.post('/api/orderitems/create-orderitem', orderItem.createOrderItem);

module.exports = router;