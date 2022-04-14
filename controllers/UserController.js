var User = require("../models/User");

class UserController {

    async index(req, res) {
        var users = await User.findAll();
        res.json(users);
    }

    async findUser(req, res) {
        var id = req.params.id;
        await User.findById(id);
        if(user == undefined) {
            res.status(404);
            res.json({});
        } else {
            res.status(200);
            res.json(user);
        }
    }

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

        var emailExists = await User.findEmail(email);
        
        if(emailExists){
            res.status(406);
            res.jason({err: "o e-mail já está cadastrado"});
            return;
        }

        await User.new(email, password, name);

        res.status(200);
        res.send("tudo Ok");
    }

    async edit(req, res) {
        var {id, name, role, email} = req.body;
        
        var result = await User.update(id, email, name, role);
        
        if(result != undefined) {
            if(result.status) {
                res.status(200);
                req.send("tudo ok!");
            } else {
                res.status(406);
                res.send(result.err);
            }
        } else {
            res.status(406);
            res.send("ocorreu um erro no servidor");
        }
        
    }

    async remove(req, res) {
        var id = req.params.id;

        var result = await User.delete(id);

        if(result.status) { 
            res.status(200);
            res.send("tudo ok");
        } else {
            res.status(406);
            res.send(result.err);
        }
    }
}

module.exports = new UserController();