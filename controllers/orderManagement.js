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
    const user_id = req.params.user_id
    const { order_items } = req.body;

    if (!user_id) {
        res.status(400).json({ message: "User id is required"});
    }

    const query = 'INSERT INTO public.order(user_id, order_items) VALUES($1, $2) RETURNING *;';
    const values = [user_id, order_items];

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