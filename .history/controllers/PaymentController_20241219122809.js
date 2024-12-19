const CatalogController = {
    showCatalogFavorit: (req, res) => {
      res.render("user/main", { 
        title: "Wishlist Favorit",
        user: req.session.user,
        content: 'catalogfavorit'
      });
    },
  
    showCatalog: (req, res) => {
      res.render("user/main", {
        title: "Daftar Program Donasi",
        user: req.session.user,
        content: 'catalog'
      });
    }
  };
  
  module.exports = CatalogController;
  