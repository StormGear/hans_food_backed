const express = require('express');
const orderItemRouter = express.Router();
const client = require('./userManagement');
const orderItemClient = client.client;

const getAllOrderItems = (req, res) => {
    orderItemClient.query('SELECT * FROM public.order_item;', async (err, results) => {
  try {
    if (err) throw err;
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  });
}

const getAllOrderItemsByOrderId = (req, res) => {
    const order_id = req.params.order_id;

    if (!order_id) {
        res.status(400).json({message : "Order id is required"});
    }
    const query = 'SELECT * FROM public.order_item WHERE order_id = $1'
    orderItemClient.query(query, [order_id], (err, results) => {
        try {
            if (err) throw err;
            res.status(200).json(results.rows);
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    })
}

const createOrderItem = (req, res) => {
    const { cart_id, menuitem_id, extra_toppings, quantity } = req.body;
    
    if (!menuitem_id || !cart_id) {
        return res.status(400).json({ message: "menuitem id or cart_id are required" });
    }

    const query = 'INSERT INTO public.order_item(order_id, cart_id, menuitem_id, extra_toppings, quantity) VALUES($1, $2, $3, $4) RETURNING *;'
    const values = [cart_id, menuitem_id, extra_toppings, quantity]

    orderItemClient.query(query, values, (err, results) => {
        try {
            if (err) throw err;
            res.status(201).json(results.rows[0]);
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
    })
}


module.exports = {
    getAllOrderItems,
    getAllOrderItemsByOrderId,
    createOrderItem
}