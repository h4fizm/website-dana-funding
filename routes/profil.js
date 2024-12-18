const express = require('express');
const router = express.Router();
const ProfilController = require('../controllers/ProfilController');

// Middleware untuk memastikan user sudah login
const isAuthenticated = (req, res, next) => {
    if (req.session.user) return next();
    res.redirect('/login');
};

router.get('/user/profil', isAuthenticated, ProfilController.getProfile);
router.get('/user/profile', isAuthenticated, (req, res) => {
    res.render('user/menu/profil', { user: req.session.user });
});
router.post('/user/edit-profile', isAuthenticated, ProfilController.updateProfile);

module.exports = router;
