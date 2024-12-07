const express = require('express');
const menuItemRouter = express.Router();
const client = require('./userManagement');
const menuItemClient = client.client;

const getAllMenuItems = (_, res) => {
    menuItemClient.query('SELECT * FROM public.menuitem;', async (err, results) => {
  try {
    if (err) throw err;
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  });
}

const getMenuItemByMenuItemId = (req, res) => {
    const menuitem_id = req.params.menuitem_id;

    if (!menuitem_id) {
        res.status(400).json({message : "Menuitem id is required"});
    }
    const query = 'SELECT * FROM public.menuitem WHERE menuitem_id = $1'
    menuItemClient.query(query, [menuitem_id], (err, results) => {
        try {
            if (err) throw err;
            res.status(200).json(results.rows);
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    })
}

const createMenuItem = (req, res) => {
    const { price, name, nutritional_info, extra_toppings } = req.body;
    
    if (!price || !name || !nutritional_info) {
        return res.status(400).json({ message: "Price or name or nutritional_info are required" });
    }

    const query = 'INSERT INTO public.menuitem(price, name, nutritional_info, extra_toppings) VALUES($1, $2, $3, $4) RETURNING *;'
    const values = [price, name, nutritional_info, extra_toppings ]

    menuItemClient.query(query, values, (err, results) => {
        try {
            if (err) throw err;
            res.status(201).json(results.rows[0]);
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
    })
}


module.exports = {
    getAllMenuItems,
    getMenuItemByMenuItemId,
    createMenuItem
}