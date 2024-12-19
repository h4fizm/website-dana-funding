const AdminController = {
    // Menampilkan halaman dashboard
    showDashboard: (req, res) => {
      res.render("admin/dashboard", { 
        activePage: "dashboard", 
        contentFile: "menu/dashboardContent"  // Menambahkan konten khusus untuk dashboard
      });
    },
  
    // Menampilkan halaman daftar donasi
    showDonations: (req, res) => {
      res.render("admin/dashboard", { 
        activePage: "donations", 
        contentFile: "menu/donationtable"  // Konten untuk halaman donasi
      });
    },
  
    // Menampilkan halaman daftar feedback
    showFeedback: (req, res) => {
      res.render("admin/dashboard", { 
        activePage: "feedback", 
        contentFile: "menu/feedbacktable"  // Konten untuk halaman feedback
      });
    },
  
    // Menampilkan halaman daftar pengguna
    showUsers: (req, res) => {
      res.render("admin/dashboard", { 
        activePage: "users", 
        contentFile: "menu/usertabel"  // Konten untuk halaman pengguna
      });
    },
  
    // Menampilkan halaman profil pengguna
    showProfile: (req, res) => {
      res.render("admin/dashboard", { 
        activePage: "profile", 
        contentFile: "menu/userprofile"  // Konten untuk halaman profil pengguna
      });
    },
  };
  
  module.exports = AdminController;
  