const sessionid = 'language-sessionid';

module.exports = function(ctx) {
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
				maxAge: 10 * 12 * 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});
		}
	});

	Object.defineProperty(ctx, 'userid', {
		get: () => {
			return ctx.cookies.get('userid', {
				signed: true,
				httpOnly: true
			});
		},
		set: (value) => {
			ctx.cookies.set('userid', value, {
				signed: true,
				maxAge: 10 * 12 * 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});
		}
	});

	ctx.sess = async function(session) {
		if (session && Object.prototype.toString.call(session) === '[object Object]') {
			let { ticket, userId } = session;
			ctx.ticket = ticket;
			ctx.userId = userId;
		}
		if (!session && ctx.ticket) {
			let userid = await ctx.post('/account/findInfoByT', { t: ctx.ticket });
			// console.log("​userid", userid)
			if (userid.cd == 0) {
				var res = await ctx.post('/account/findUserById', { uid: userid.data.userId });
				return res;
			}
			await ctx.clearSess();
			return userid;
		}
		return {};
	};

	ctx.clearSess = async () => {
		ctx.ticket = null;
		ctx.userid = null;
	};
};
