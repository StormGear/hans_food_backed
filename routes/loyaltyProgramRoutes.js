const express = require('express');
const router = express.Router();
const loyalty = require('../controllers/loyaltyProgramManagement');


/**
 * @swagger
 * tags:
 *   name: Loyalty Program Management
 *   description: Routes for managing the Loyalty Program 
 */

/**
 * @swagger
 * /loyalty:
 *   get:
 *     tags: [Loyalty Program Management]
 *     description: Retrieve a list of all loyalties
 *     summary: Get all loyalties
 *     responses:
 *       200:
 *         description: A list of all loyalties
 *         content:
 *          application/json:
 *           schema:
 *              type: object
 *              properties:
 *                loyalty_id:
 *                   type: integer
 *                   example: 1
 *                user_id:
 *                   type: integer
 *                   example: 1
 *                points:
 *                   type: integer
 *                   example: 1
 *                updated_at:
 *                   type: date
 *                   example: 2021-04-01
 *  
 */
router.get('/api/loyalty', loyalty.getAllLoyalties);



/**
 * @swagger
 * /loyalty/{user_id}:
 *   get:
 *     tags: [Loyalty Program Management]
 *     description: Retrieve loyalty points for a given user id
 *     summary: Get loyalty points for a given user id
 *     parameters:
 *       - in: path
 *         name: user_id
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
 *                   points:
 *                     type: integer
 *                     example: 1
 *  
 */
router.get('/api/loyalty/:user_id', loyalty.getLoyaltyPointsByUserId);

module.exports = router;

