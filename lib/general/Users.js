import { raw, transaction } from 'objection';
import { Users as UsersModel } from '../models/Users';

export const Users = (router) => {
    
    router.get('/list', async (ctx, next) => {
        const res = await UsersModel.query().withGraphJoined("companies")
        //.where("companies.id", ctx.companyProfile.company_id)
        //.where("active", true)

        ctx.body = res 
    })

    router.post('/save', async (ctx, next) => {
        const {username, profile_id} = {...ctx.data}
        if(!username) throw new Error("Informe o nome de usuário, por favor");
        if(!profile_id) throw new Error("Selecione um perfil de acesso");

        let user = await UsersModel.query().findOne(raw("LOWER(username)"), username.toLowerCase())
    
        await UsersModel.query().patchAndFetchById(user.id, {profile_id, company_id: ctx.companyProfile.company_id})

        ctx.status = 201
    })
}