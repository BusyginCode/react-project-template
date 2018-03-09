const express = require('express');
const router = express.Router();

router.get('/1', function(req, res) {
  res.send('Privet');
});

export default router;
