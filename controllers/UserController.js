var User = require("../models/User");

class UserController {

    async index(req, res){}

    async create(req, res){
        console.log(req.body);
        var {email, name, password} = req.body;

        if(email == undefined){
            res.status(400);
            res.json({err: "e-mail inválido"})
            return;
        }
        if(password == undefined){
            res.status(400);
            res.json({err: "senha inválida"})
            return;
        }
        if(name == undefined){
            res.status(400);
            res.json({err: "nome inválido"})
            return;
        }

        await User.new(email, password, name);

        res.status(200);

        res.send("tudo Ok");
    }
}

module.exports = new UserController();