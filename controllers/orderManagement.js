const client = require('../controllers/userManagement');
const orderClient = client.client;

const getAllOrders = (req, res) => {
    orderClient.query('SELECT * FROM public.order;', async (err, results) => {
  try {
    if (err) throw err;
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  });
}

const getAllOrdersByUserId = (req, res) => {
    const user_id = req.params.user_id;

    if (!user_id) {
        res.status(400).json({ message: "User id is required"});
    }

    const query = 'SELECT * FROM public.order WHERE user_id = $1';
    orderClient.query(query, [user_id], (err, results) => {
        try {
            if (err) throw err;
            res.status(200).json(results.rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}

const createOrder = (req, res) => {
    const { user_id, total_amount } = req.body;

    if (!user_id || !total_amount) {
        res.status(400).json({ message: "User id or total amount is required"});
    }

    const query = `
    BEGIN;  -- Start the transaction \
     -- create order items from all items in the cart, total amount from previous query \
      DO $$ \
      DECLARE \
        new_order_id INT;  -- Variable to store the order_id of the newly inserted row \
      BEGIN \
        -- Insert a new row into the 'orders' table and capture the 'order_id' into the variable\
        INSERT INTO "order" (user_id, total_amount) \
        VALUES ($1, $2) \
        RETURNING "order_id" INTO new_order_id; \
        \
      INSERT INTO "order_item" (order_id, menuitem_id, quantity, extra_toppings) \
      SELECT new_order_id, menuitem_id, quantity, extra_toppings \
      FROM "cart_item" \
      WHERE cart_id = $1; \

	    DELETE FROM "cart_item" WHERE cart_id = $1; \

    -- Optionally, do something with the returned value, like print it (for demonstration) \
      RETURNING new_order_id;\
    END $$; \
    COMMIT;  -- Commit the transaction \
    `;

    const values = [user_id, total_amount];

    orderClient.query(query, values,  (err, results) => {
        try {
          if (err) throw err;
          res.status(201).json(results.rows[0]);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
        });
}

const updateOrderStatus = (req, res) => {
    const { order_id, order_status } = req.body;
  
    if (!order_id || !order_status) {
      return res.status(400).json({ message: "Order id and order status are required" });
    }
  
    const query = 'UPDATE public.order SET order_status = $1, updated_at = $2 WHERE order_id = $3 RETURNING *;';
    const values = [order_status, new Date().toISOString(), order_id];
  
    orderClient.query(query, values, (err, results) => {
      try {
        if (err) throw err;
        res.status(201).json(results.rows[0]);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  };

module.exports = {
    getAllOrders,
    createOrder,
    updateOrderStatus,
    getAllOrdersByUserId
}