const router = require('express').Router();
const { create,list,show, destroy } = require('../controllers/fav');
const { auth } = require('../utils/auth');

router.route('/favs').post(auth,create).get(auth,list);
router.route('/favs/:Id').get(auth,show).delete(auth, destroy);

module.exports = router;