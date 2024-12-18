const User = require('../models/User');
const bcrypt = require('bcrypt');

const ProfilController = {
    getProfile: async (req, res) => {
        try {
            const userId = req.session.user.id;
            const user = await User.findByPk(userId);
            
            res.render('user/main', {
                user: user,
                title: 'Profil Pengguna',
                content: 'profil'
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Terjadi kesalahan saat mengambil data profil');
        }
    },
    updateProfile: async (req, res) => {
        const { name, email, password } = req.body;
        try {
            const userId = req.session.user.id;
            const user = await User.findByPk(userId);
            
            // Memperbarui data pengguna
            if (user) {
                user.name = name;
                user.email = email;
                if (password) {
                    user.password = await bcrypt.hash(password, 10);
                }
                await user.save(); // Simpan perubahan ke database
            }
            res.redirect('/user/profil?success=true'); // Redirect setelah pembaruan
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Terjadi kesalahan saat memperbarui profil');
        }
    },
    editProfile: async (req, res) => {
        const { name, email, password } = req.body;
        try {
            const userId = req.session.user.id;
            const user = await User.findByPk(userId);
            
            // Memperbarui data pengguna
            if (user) {
                user.name = name;
                user.email = email;
                if (password) {
                    user.password = password; // Pastikan untuk mengenkripsi password sebelum menyimpannya
                }
                await user.save(); // Simpan perubahan ke database
            }
            res.redirect('/user/profil'); // Redirect setelah pembaruan
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Terjadi kesalahan saat memperbarui profil');
        }
    }
};

module.exports = ProfilController;
