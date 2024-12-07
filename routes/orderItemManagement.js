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


module.exports = {
    getAllOrderItems,
    getAllOrderItemsByOrderId
}