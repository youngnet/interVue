const sessionid = 'bilingual-sessionid';

export default function stoken(ctx) {
    Object.defineProperty(ctx, 'ticket', {
        get: () => {
            return ctx.cookies.get(sessionid, {
                signed: true,
                httpOnly: true
            });
        },
        set: (value) => {
            ctx.cookies.set(sessionid, value, {
                signed: true,
                httpOnly: true
            });
        }
    });


    ctx.sess = (session) => {
       if(session){
            ctx.ticket = session;
        }
        return ctx.ticket;//查询用户信息。
    };
    ctx.clearSess = () =>{
        ctx.ticket = null;
    },
    ctx.clearCookie =() => {
        ctx.ticket = null;
        ctx.resetPwdSign = null;
        ctx.emailCode = null;
    }
}
