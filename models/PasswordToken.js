var knex = require("../database/connection");
const User = require("./User");
var user = require("./User");

class PasswordToken {
    async create(email) {
        var user =await User.findByEmail(email);
        if(user != undefined) {
            try {

                var token = Date.now();

                await knex.insert({
                    user_id: user.id,
                    used: 0,
                    token: token
                }).table("passwordtokens")
                return {status: true, token: token}
            } catch {
                console.log(err);
                return {status: false, err: err}
            }
            
        } else {
            return {status: false, err: "o e-mail não eixste no banco de dados"}
        }
    }
}

module.exports = new PasswordToken();