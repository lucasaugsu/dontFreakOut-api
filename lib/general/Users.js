import { raw, transaction } from 'objection';
import UserService from '../../services/UserService'

export const Users = (router) => {
    
    router.get('/list', async (ctx, next) => {
        const users = await UserService.allUsers(ctx)
        ctx.status = 200
        ctx.body = users
    })
}