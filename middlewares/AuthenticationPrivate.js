
module.exports = async (ctx, next) => {
        try {
                if(ctx.request.header.authorization) {
                        await next()
                } else {
                        ctx.status = 401
                }
        } catch (error) { ctx.body = { error: error.message } }
}
