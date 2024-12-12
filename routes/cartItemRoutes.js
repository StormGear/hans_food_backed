const express = require('express');
const router = express.Router();
const cartItem = require('../controllers/cartItemManagement');

/**
 * @swagger
 * tags:
 *   name: Cart Item Management
 *   description: Routes for managing cart items
 */

/**
 * @swagger
 * /cartitems:
 *   get:
 *     tags: [Cart Item Management]
 *     description: Retrieve a list of all cart items
 *     summary: Get all cart items
 *     responses:
 *       200:
 *         description: A list of all cart items
 *         content:
 *          application/json:
 *           schema:
 *              type: object
 *              properties:
 *                cartitem_id:
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
 *  
 */
router.get('/api/cartitems', cartItem.getAllCartItems);

/**
 * @swagger
 * /cartitems/{cart_id}:
 *   get:
 *     tags: [Cart Item Management]
 *     description: Retrieve a list of all cart items with a given cart id
 *     summary: Get all cart items with a given cart id
 *     parameters:
 *       - in: path
 *         name: cart_id
 *         required: true
 *     responses:
 *       200:
 *         description: A list of all cart items by cart id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   cartitem_id:
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
router.get('/api/cartitems/:cart_id', cartItem.getAllCartItemsByCartId);

/**
 * @swagger
 * /cartitems/create-cartitem:
 *   post:
 *     tags: [Cart Item Management]
 *     description: Create a new cart item
 *     summary: Create a new cart item
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *              type: object
 *              properties:
 *                cart_id:
 *                   type: integer
 *                   example: 1
 *                menuitem_id:
 *                   type: integer
 *                   example: 1
 *                extra_toppings:
 *                   type: string[]
 *                   example: ["cheese"]
 *     responses:
 *       201:
 *         description: A new cart item has been created
 *         content:
 *          application/json:
 *           schema:
 *              type: object
 *              properties:
 *                cartitem_id:
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
 */
router.post('/api/cartitems/create-cartitem', cartItem.createCartItem);


/**
 * @swagger
 * /cartitems/remove-cartitem:
 *   delete:
 *     tags: [Cart Item Management]
 *     description: remove a new cart item
 *     summary: remove a new cart item
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *              type: object
 *              properties:
 *                cart_id:
 *                   type: integer
 *                   example: 1
 *                menuitem_id:
 *                   type: integer
 *                   example: 1
 *     responses:
 *       201:
 *         description: Cart item has been removed
 *         content:
 *          application/json:
 *           schema:
 *              type: object
 *              properties:
 *                message:
 *                   type: string
 *                   example: Cart item has been removed
 */
router.delete('/api/cartitems/remove-cartitem', cartItem.removeCartItem)


/**
 * @swagger
 * /cartitems/update-cartitem-quantity:
 *   put:
 *     tags: [Cart Item Management]
 *     description: Update a cart item quantity
 *     summary: Update a cart item quantity
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *              type: object
 *              properties:
 *                cartitem_id:
 *                   type: integer
 *                   example: 1
 *                quantity:
 *                   type: integer
 *                   example: 1
 *     responses:
 *       201:
 *         description: A cart item quantity has been updated
 *         content:
 *          application/json:
 *           schema:
 *              type: object
 *              properties:
 *                cartitem_id:
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
 */
router.put('/api/cartitems/update-cartitem-quantity', cartItem.updateQuantityOfCartItem)

/**
 * @swagger
 * /cartitems/allcart-totalcost/{cart_id}:
 *   get:
 *     tags: [Cart Item Management]
 *     description: Get all items in cart and total cost for each item and total cost of all cart items
 *     summary: Get all items in cart and total cost for each item and total cost of all cart items
 *     parameters:
 *      - in: path
 *        name: cart_id
 *        required: true
 *     responses:
 *       200:
 *         description: All items in cart and total cost for each item and total cost of all cart items
 *         content:
 *          application/json:
 *           schema:
 *              type: object
 *              properties:
 *               items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                      cartitem_id:
 *                       type: integer
 *                       example: 1
 *                      extra_toppings:
 *                       type: string[]
 *                       example: ["cheese"]
 *                      price:
 *                       type: integer
 *                       example: 1
 *                      quantity:
 *                       type: integer
 *                       example: 1
 *                      total_price:
 *                       type: integer
 *                       example: 10.00
 *                      name:
 *                       type: string
 *                       example: "Fufu and Light Soup"
 *               total_cost:
 *                    type: integer
 *                    example: 100.00
 *   
 */
router.get('/api/cartitems/allcart-totalcost/:cart_id', cartItem.getCartItemsAndTotalCostForEachItem)

/**
 * @swagger
 * /cartitems/cart-total-cost/{cart_id}:
 *   get:
 *     tags: [Cart Item Management]
 *     description: Total cost of all cart items
 *     summary: Total cost of all cart items
 *     parameters:
 *      - in: path
 *        name: cart_id
 *        required: true
 *     responses:
 *       200:
 *         description: The total cost of all cart items 
 *         content:
 *          application/json:
 *           schema:
 *              type: object
 *              properties:
 *                total_cart_value:
 *                   type: integer
 *                   example: 100
 *  
 */
router.get('/api/cartitems/cart-total-cost/:cart_id', cartItem.totalCostOfAllCartItems)

/**
 * @swagger
 * /cartitems/clear-cart/{cart_id}:
 *   delete:
 *     tags: [Cart Item Management]
 *     description: Clear all items in cart
 *     summary: Clear all items in cart
 *     parameters:
 *      - in: path
 *        name: cart_id
 *        required: true
 *     responses:
 *       200:
 *         description: Cart items have been cleared
 *         content:
 *          application/json:
 *           schema:
 *              type: object
 *              properties:
 *                message:
 *                   type: string
 *                   example: Cart items have been cleared
 *  
 */
router.delete('/api/cartitems/clear-cart/:cart_id', cartItem.clearCartItems)


module.exports = router;