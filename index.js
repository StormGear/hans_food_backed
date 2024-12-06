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
      contact: {
        name: 'By Papa Kofi',
        url: 'papakofi.tech',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
      {
        url: 'https://simple-express-proj-b3a02135f433.herokuapp.com/',
        description: 'Production server',
      }
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
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: johndoe@example.com
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
 *         name: id
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
 * api/users/add-user:
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
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Name and email are required
 *       500:
 *          description: Internal server error
 */
app.post('/api/users/add-user', user.createUser);

/**
 * @swagger
 * /api/users/update-user/{id}:
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
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       500:
 *          description: Internal Server Error
 */
app.put('/api/users/update-user/:id', user.updateUser);

/**
 * @swagger
 * /api/users/delete-user/{id}:
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



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}` );
});