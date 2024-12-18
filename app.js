const express = require('express');
const app = express();
const path = require('path');
const hoganMiddleware = require('hogan-middleware');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors')

app.use(cors())

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
  apis: ['./index.js', './routes/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.set('view engine', 'ejs');     // name your templates
app.engine('mustache', hoganMiddleware.__express); // register the engine
app.use(express.static(path.join(__dirname, 'public'))); // tell express where to find static files
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(express.json()); // Middleware to parse JSON bodies

// register the routes in the app
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderItemRoutes = require('./routes/orderItemRoutes');
const cartItemRoutes = require('./routes/cartItemRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes');
const cartRoutes = require('./routes/cartRoutes');
const loyaltyRoutes = require('./routes/loyaltyProgramRoutes');
app.use(userRoutes);
app.use(orderRoutes);
app.use(orderItemRoutes);
app.use(cartItemRoutes);
app.use(menuItemRoutes);
app.use(cartRoutes);
app.use(loyaltyRoutes);

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



module.exports = app;