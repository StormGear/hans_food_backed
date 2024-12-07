const express = require('express');
const router = express.Router();
const menuItem = require('../controllers/menuItemManagement');

/**
 * @swagger
 * tags:
 *   name: Menu Item Management
 *   description: Routes for managing items on the menu
 */

/**
 * @swagger
 * /menuitems:
 *   get:
 *     tags: [Menu Item Management]
 *     description: Retrieve a list of all items on the menu
 *     summary: Get all items on the menu
 *     responses:
 *       200:
 *         description: A list of items on the menu.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   menuitem_id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Fufu and Light Soup
 *                   price:
 *                     type: decimal(10,2)
 *                     example: 10.00
 *                   nutritional_info:
 *                     type: string[]
 *                     example: ["calories: 500", "fat: 20g"]
 *                   extra_toppings:
 *                     type: string[]
 *                     example: ["goat meat"]
 *                   created_at:
 *                     type: timestamp
 *                     example: 2024-12-07 12:00:00
 *                   updated_at:
 *                     type:  timestamp
 *                     example: 2024-12-07 12:00:00
 *  
 */
router.get('/api/menuitems',  menuItem.getAllMenuItems);

/**
 * @swagger
 * /menuitems/{menuitem_id}:
 *   get:
 *     tags: [Menu Item Management]
 *     description: Retrieve a list of all order items by order id
 *     summary: Get all order items by order id
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
 *                   menuitem_id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Fufu and Light Soup
 *                   price:
 *                     type: decimal(10,2)
 *                     example: 10.00
 *                   nutritional_info:
 *                     type: string[]
 *                     example: ["calories: 500", "fat: 20g"]
 *                   extra_toppings:
 *                     type: string[]
 *                     example: ["goat meat"]
 *                   created_at:
 *                     type: timestamp
 *                     example: 2024-12-07 12:00:00
 *                   updated_at:
 *                     type:  timestamp
 *                     example: 2024-12-07 12:00:00
 *  
 */
router.get('/api/menuitems/:menuitem_id', menuItem.getAllMenuItemsByMenuItemId);

/**
 * @swagger
 * /menuitems/create-menuitem:
 *   post:
 *     tags: [Menu Item Management]
 *     description: Create a new item on the menu
 *     summary: Create a new item on the menu
 *     responses:
 *       200:
 *          description: A new menu item has been created
 *          content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   menuitem_id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Fufu and Light Soup
 *                   price:
 *                     type: decimal(10,2)
 *                     example: 10.00
 *                   nutritional_info:
 *                     type: string[]
 *                     example: ["calories: 500", "fat: 20g"]
 *                   extra_toppings:
 *                     type: string[]
 *                     example: ["goat meat"]
 *                   created_at:
 *                     type: timestamp
 *                     example: 2024-12-07 12:00:00
 *                   updated_at:
 *                     type:  timestamp
 *                     example: 2024-12-07 12:00:00
 *       400:
 *          description: Price or name or nutritional_info are required
 */
router.post('/api/menuitems/create-menuitem', menuItem.createMenuItem);

module.exports = router;