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

    static signup(ctx, params){
        return new Promise(async (resolve, reject) => {
            try {
                let params = {...ctx.data}
                if(!params.username) throw new Error("Insira o seu username para cadastrar")
                if(!params.email) throw new Error("Insira o seu email para cadastrar")
                if(!params.birthday) throw new Error("Insira sua data de aniversário para cadastrar")
                if(!params.password) throw new Error("Insira sua senha para cadastrar")
    
                let existent = await UsersModel.query().findOne(raw("email"), params.email)
                if(existent) throw new Error("Já existe um usuário com esse email")
    
                const user = await UsersModel.query().insertAndFetch({
                    name: params.username,
                    username: params.username,
                    email: params.email,
                    birthday: params.birthday,
                    password: raw(`md5('${params.password}')`),
                })
    
                resolve(user)
            }catch(err){
                reject(err)
            }
        })
    }
}

export default AuthService