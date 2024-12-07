const express = require('express');
const router = express.Router();
const { Client } = require('pg');
require('dotenv').config(); // read .env files
const bcrypt = require('bcrypt');
const saltRounds = 10;


// connect to the database
const client = new Client({
  connectionString: process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();


const getAllUsers = (req, res) => {
  client.query('SELECT * FROM public.users;', async (err, results) => {
try {
  if (err) throw err;
  res.status(200).json(results.rows);
} catch (err) {
  res.status(500).json({ error: err.message });
}
});
}

const getUserById = (req, res) => {
  const id = req.params.id;
  client.query('SELECT * FROM public.users WHERE id = $1;', [id],  (err, results) => {
    try {
      if (err) throw err;
      res.status(200).json(results.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}

const createUser = async (req, res) => {
  const {  name, email, password, allergies, created_at, updated_at } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name or email or password are required' });
  }

  try {
     // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = 'INSERT INTO public.users(name, email, password, allergies, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;';
    const values = [name, email, hashedPassword, allergies, created_at, updated_at];

    client.query(query, values,  (err, results) => {
    try {
      if (err) throw err;
      res.status(201).json(results.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  }


const updateUser = (req, res) => {
  const id = req.params.id;
  const { name, email} = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  client.query('UPDATE public.users SET name = $1, email = $2 WHERE id = $3 RETURNING *;', [name, email, id], (err, results) => {
    try {
      if (err) throw err;
      res.status(200).json(results.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
}


const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  client.query('DELETE FROM public.users WHERE id = $1;', [id],  (err, results) => {
    try {
      if (err) throw err;
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}

router.get('/params/:name/:age', (req, res) => {
    const data = {
        name: req.params.name,
        age: req.params.age
    }

    res.json({
        name,
        age
    });
})

module.exports = {
    router,
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};