import moment from 'moment'
import Authenticate from '../../middlewares/Authenticate'
import AuthService from '../../services/AuthService'

export const renderUserAuth = user => ({
    ...user,
    oauth: Authenticate({
        id: user.id, 
        username: user.username, 
        jwt_datetime: moment().format(),
    }),
})

export const Auth = (router) => {

    router.post('/login', async (ctx, next) => {
        let params = {...ctx.data}
        const user = await AuthService.login(ctx, params)
        ctx.status = 200
        ctx.body = renderUserAuth(user)
    })
    
    router.post('/signup', async (ctx, next) => {
        let params = {...ctx.data}
        const user = await AuthService.signup(ctx, params)
        ctx.status = 200
        ctx.body = renderUserAuth(user)
    })

}
