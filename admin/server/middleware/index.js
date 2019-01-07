import ctx_http_info from './ctx_http_info';
import ctx_stoken from './ctx_stoken';
import ctx_api from "./ctx_api";

export default function index(app) {
    app.use(async(ctx, next) => {
        ctx_http_info(ctx);
        ctx_stoken(ctx);
        ctx_api(ctx)
        await next();
    });
}
