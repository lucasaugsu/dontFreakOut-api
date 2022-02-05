import md5 from 'md5'
import { raw } from 'objection'
import { Users as UsersModel } from "../lib/models/Users"

class UserService{

    static allUsers(ctx){
        return new Promise(async (resolve, reject) => {
            try{
                const users = await UsersModel.query()
                //.where("companies.id", ctx.companyProfile.company_id)
                //.where("active", true)

                resolve(users)
            }catch(err){
                reject(err)
            }
        })
    }

    static signup(ctx, params){
        return new Promise(async (resolve, reject) => {
            try {
                let params = {...ctx.data}
                if(!params.name) throw new Error("Insira o seu nome para cadastrar")
                if(!params.username) throw new Error("Insira o seu username para cadastrar")
                if(!params.email) throw new Error("Insira o seu email para cadastrar")
                if(!params.birthday) throw new Error("Insira sua data de aniversário para cadastrar")
                if(!params.password) throw new Error("Insira sua senha para cadastrar")
    
                let existent = await UsersModel.query().findOne(raw("email"), params.email)
                if(existent) throw new Error("Já existe um usuário com esse email")
    
                const user = await UsersModel.query().insertAndFetch({
                    name: params.name,
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

export default UserService