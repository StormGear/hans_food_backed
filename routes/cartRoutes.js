const express = require('express');
const router = express.Router();
const cart = require('../controllers/cartManagement');

/**
 * @swagger
 * tags:
 *   name: Cart Management
 *   description: Routes for managing items in the cart
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     tags: [Cart Management]
 *     description: Retrieve a list of all carts
 *     summary: Get all carts
 *     responses:
 *       200:
 *         description: A list of carts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   cart_id:
 *                     type: integer
 *                     example: 1
 *                   order_items:
 *                     type: array
 *                     items:
 *                      type: object
 *                      properties:
 *                       orderitem_id:
*                           type: integer
*                           example: 1
 *                       order_id:
 *                          type: integer
 *                          example: 1
 *                       menuitem_id:
 *                          type: integer
 *                          example: 1
 *                       extra_toppings:
 *                          type: string[]
 *                          example: ["cheese"]
 *                       quantity:
 *                          type: integer
 *                          example: 1         
 *                       user_id:
 *                          type: integer
 *                          example: 1
 *  
 */
router.get('/api/cart',  cart.getAllCarts);

/**
 * @swagger
 * /cart/{cart_id}:
 *   get:
 *     tags: [Cart Management]
 *     description: Retrieve a list of all cart items by cart id
 *     summary: Get all cart items by cart id
 *     responses:
 *       200:
 *         description: A list of all order items by order id
 *         content:
 *           application/json:
 *             schema:
 *                     type: array
 *                     items:
 *                      type: object
 *                      properties:
 *                       orderitem_id:
*                           type: integer
*                           example: 1
 *                       order_id:
 *                          type: integer
 *                          example: 1
 *                       menuitem_id:
 *                          type: integer
 *                          example: 1
 *                       extra_toppings:
 *                          type: string[]
 *                          example: ["cheese"]
 *                       quantity:
 *                          type: integer
 *                          example: 1         
 *                       user_id:
 *                          type: integer
 *                          example: 1
 *  
 */
router.get('/api/cart/:cart_id', cart.getCartByCartId);

/**
 * @swagger
 * /cart/create-cart:
 *   post:
 *     tags: [Cart Management]
 *     description: Create a cart
 *     summary: Create a cart
 *     responses:
 *       200:
 *         description: A new cart has been created
 *         content:
 *           application/json:
 *             schema:
 *                      type: object
 *                      properties:
 *                       orderitem_id:
*                           type: integer
*                           example: 1
 *                       order_id:
 *                          type: integer
 *                          example: 1
 *                       menuitem_id:
 *                          type: integer
 *                          example: 1
 *                       extra_toppings:
 *                          type: string[]
 *                          example: ["cheese"]
 *                       quantity:
 *                          type: integer
 *                          example: 1         
 *                       user_id:
 *                          type: integer
 *                          example: 1
 *  
 */
router.post('/api/cart/create-cart', cart.createCart);

module.exports = router;