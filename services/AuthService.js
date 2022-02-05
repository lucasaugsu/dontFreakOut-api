import md5 from 'md5'
import { raw } from 'objection'
import { Users as UsersModel } from "../lib/models/Users"
//import { Customer as CustomerModel } from "../lib/models/Customer"

class AuthService{

    static login(ctx, params){
        return new Promise(async (resolve, reject) => {
            try{
                if(!params.username) throw new Error("Insira o seu username para fazer o login")
                if(!params.password) throw new Error("Insira a sua senha para fazer o login")

                let user = await UsersModel.query()
                    //.withGraphFetched("[address, companyProfiles]")
                    .where(build => {
                        build
                        .where(raw("LOWER(username)"), params.username.toLowerCase())
                        //.orWhere("cpf", params.username.replace(/ |\.|\-|\_/g, ""))
                    })
                    .findOne("password", md5(params.password))

                if(!user) throw new Error("Aconteceu algum erro para fazer o login")
                //if(!user.companyProfiles[0]) throw new Error(ctx.strings.userWithoutProfile)

                resolve(user)
            }catch(err){
                reject(err)
            }
        })
    }
}

export default AuthService