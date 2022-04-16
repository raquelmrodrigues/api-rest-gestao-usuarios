var User = require("../models/User");
var PasswordToken = require("../models/PasswordToken");
const { is } = require("express/lib/request");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");


var secret = "ausdhuiashdiuashdhadusiwk";

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

    async recoverPassword(req, res) {
        var email = req.body.email;

        var result = await PasswordToken.create(email);

        if(result.status) {
            res.status(200);
            res.send("" + result.token); // um jeito de converter pra string
        } else {
            res.status(406);
            res.send(result.err);
        }
    }

    async changePassword(req, res) {
        var token = req.body.token;
        var password = req.body.password;
        var isValid = await PasswordToken.validate(token);

        if(isTokenValid.status) {
            await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token);
            res.status(200);
            res.send("senha alterada");
        } else {
            res.status(406);
            res.send("token inválido");
        }

    }

    async login(req, res) {
        var {email, password} = req.body;

        var user = await User.findByEmail(email);

        if(user != undefined) {
            var resultado = await bcrypt.compare(password, user.password);
            if(resultado){
                var token = jwt.sign({ email: user.email, role: user.role }, secret);
                res.status(200);
                res.json({token: token});
            } else {
                res.status(406);
                res.send("Senha incorreta")
            }
        } else {
            res.json({status: false});
        }
    }
}

module.exports = new UserController();