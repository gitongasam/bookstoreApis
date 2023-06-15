const express = require('express');

const {  } = require('../controllers/controllers');

const router = express.Router();

router.get('/allmembers',getAllMembers)
router.post('/members',registerMember)
router.get('/memberbyid/:id',getMemberById)

module.exports = router;
