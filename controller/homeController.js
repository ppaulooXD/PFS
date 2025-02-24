

class HomeController {

    home(req, res) {
        res.render("home.ejs")
    }

    contato(req, res) {
        res.render("contato.ejs");
    }

    sobre(req, res) {
        res.render("sobre.ejs");
    }

}
module.exports = HomeController;