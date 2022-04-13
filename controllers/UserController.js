class UserController {

    async index(req, res){}

    async create(req, res){
        console.log(req.body);
        var {email, name, password} = req.body;

        if(email == undefined){
            res.status(400);
            res.json({err: "e-mail inválido"})
        }
        if(password == undefined){
            res.status(400);
            res.json({err: "senha inválida"})
        }
        if(name == undefined){
            res.status(400);
            res.json({err: "nome inválido"})
        }

        res.status(200);

        res.send("pegando o corpo da requisição");
    }
}

module.exports = new UserController();