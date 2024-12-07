const express = require('express');
const router = express.Router();
const user = require('../controllers/userManagement');

/**
 * @swagger
 * tags:
 *   name: User Management
 *   description: Routes for managing users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [User Management]
 *     description: Retrieve a list of all users
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: johndoe@example.com
 *                   password:
 *                     type: string
 *                     example: password123
 *                   allergies:
 *                     type: string[]
 *                     example: ["peanuts"]
 *                   created_at:
 *                     type: timestamp
 *                     example: 2024-12-07 12:00:00
 *                   updated_at:
 *                     type:  timestamp
 *                     example: 2024-12-07 12:00:00
 *  
 */

router.get('/api/users', user.getAllUsers);

/**
 * @swagger
 * /users/{user_id}:
 *   get:
 *     tags: [User Management]
 *     description: Retrieve a user by the user ID
 *     summary: Get a user by the user ID
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 */
router.get('/api/users/:user_id', user.getUserById);

/**
 * @swagger
 * /users/add-user:
 *   post:
 *     tags: [User Management]
 *     description: Create a new user
 *     summary: Add a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Test User
 *               email:
 *                 type: string
 *                 example: testuser@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               allergies:
 *                 type: string[]
 *                 example: ["peanuts"]
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Name or email or password are required
 *       500:
 *          description: Internal server error
 */
router.post('/api/users/add-user', user.createUser);


/**
 * @swagger
 * /users/update-user/{user_id}:
 *   put:
 *     tags: [User Management]
 *     description: Update an existing user
 *     summary: Update a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Test User
 *               email:
 *                 type: string
 *                 example: testuser@example.com
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       500:
 *          description: Internal Server Error
 */
router.put('/api/users/update-user/:user_id', user.updateUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [User Management]
 *     description: Login a user
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: testuser@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       401:
 *         description: Invalid email or password.
 *       500:
 *         description: Internal server error.
 */
router.post('/api/users/login', user.loginUser);

/**
 * @swagger
 * /users/delete-user/{user_id}:
 *   delete:
 *     tags: [User Management]
 *     description: Delete a user by ID
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully.
 */
router.delete('/api/users/delete-user/:user_id', user.deleteUser);

module.exports = router;