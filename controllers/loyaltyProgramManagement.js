const client = require('./userManagement');
const loyaltyClient = client.client;

const getAllLoyalties = (req, res) => {
    loyaltyClient.query('SELECT * FROM public.loyalty_program;', async (err, results) => {
  try {
    if (err) throw err;
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  });
}

const getLoyaltyPointsByUserId = (req, res) => {
    const user_id = req.params.user_id;

    if (!user_id) {
        res.status(400).json({message : "User id is required"});
    }
    const query = 'SELECT * FROM public.loyalty_program WHERE user_id = $1'
    loyaltyClient.query(query, [user_id], (err, results) => {
        try {
            if (err) throw err;
            res.status(200).json(results.rows[0].points);
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    })
}

module.exports = {
    getAllLoyalties,
    getLoyaltyPointsByUserId
}