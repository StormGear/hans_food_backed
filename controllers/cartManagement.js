const client = require('./userManagement');
const cartClient = client.client;

const getAllCarts = (req, res) => {
    cartClient.query('SELECT * FROM public.cart;', async (err, results) => {
  try {
    if (err) throw err;
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  });
}

const getCartByCartId = (req, res) => {
    const cart_id = req.params.cart_id;

    if (!cart_id) {
        res.status(400).json({message : "Cart id is required"});
    }
    const query = 'SELECT * FROM public.cart WHERE cart_id = $1'
    cartClient.query(query, [cart_id], (err, results) => {
        try {
            if (err) throw err;
            res.status(200).json(results.rows);
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    })
}

/// TODO: Add createCart function
const createCart = (req, res) => {
    const { user_id } = req.params.user_id;
    
    if (!user_id) {
        return res.status(400).json({ message: "User id is required" });
    }

    const query = 'INSERT INTO public.cart(user_id, order_items) VALUES($1, $2) RETURNING *;'
    const values = [user_id]

    cartClient.query(query, values, (err, results) => {
        try {
            if (err) throw err;
            res.status(201).json(results.rows[0]);
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
    })
}


module.exports = {
    getAllCarts,
    getCartByCartId,
    createCart
}