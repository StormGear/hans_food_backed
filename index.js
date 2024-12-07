const express = require('express');
const app = express();
const path = require('path');
const hoganMiddleware = require('hogan-middleware');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Food Service API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
        {
            url: 'https://food-service-d1ed0096c526.herokuapp.com/api',
            description: 'Production server',
        },
    ]
  },
  apis: ['./index.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.set('view engine', 'ejs');     // name your templates
app.engine('mustache', hoganMiddleware.__express); // register the engine
app.use(express.static(path.join(__dirname, 'public'))); // tell express where to find static files
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(express.json()); // Middleware to parse JSON bodies

// register the routes in the app
const user = require('./routes/userManagement');
const order = require('./routes/orderManagement')
app.use('/api', user.router);

/**
 * @swagger
 * /:
 *   get:
 *     description: This is the base url/route
 *     summary: Returns a welcome page
 *     responses:
 *       200:
 *         description: Returns a welcome page.
 */
app.get('/api', (req, res) => {
  res.render('welcome');
});

/**
 * @swagger
 * tags:
 *   name: User Management
 *   description: Routes for managing users
 */

/**
 * @swagger
 * tags:
 *   name: Order Management
 *   description: Routes for managing orders
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
app.get('/api/users', user.getAllUsers);


/**
 * @swagger
 * /users/{id}:
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
app.get('/api/users/:id', user.getUserById);

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
 *               created_at:
 *                 type: timestamp
 *                 example: 2024-12-07 12:00:00
 *               updated_at:
 *                 type:  timestamp
 *                 example: 2024-12-07 12:00:00
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Name or email or password are required
 *       500:
 *          description: Internal server error
 */
app.post('/api/users/add-user', user.createUser);

/**
 * @swagger
 * /users/update-user/{id}:
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
app.put('/api/users/update-user/:id', user.updateUser);

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
app.post('/api/users/login', user.loginUser);

/**
 * @swagger
 * /users/delete-user/{id}:
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
app.delete('/api/users/delete-user/:id', user.deleteUser);


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
app.get('/api/orders/', order.getAllOrders);

/**
 * @swagger
 * /orders/add-order/{user_id}:
 *   post:
 *     tags: [Order Management]
 *     description: Create a new order
 *     summary: Add a new order
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             user_id:
 *               type: integer
 *               example: 1
 *     responses:
 *       201:
 *         description: Order created successfully.
 *       400:
 *         description: User id is required
 *       500:
 *          description: Internal server error
 */
app.post('/api/orders/add-order/:user_id', order.createOrder);


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
app.put('/api/orders/update-order-status', order.updateOrderStatus);



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}` );
});