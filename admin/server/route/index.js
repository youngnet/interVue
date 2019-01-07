var router = require('koa-router')();
import file from "./file";
import user from "./user";
import course from "./course";
import wx from "./wx";
import login from "./login";

router.use('/file', file.routes(), file.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());
router.use('/course', course.routes(), course.allowedMethods());
router.use('/wx', wx.routes(), wx.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());

export default router;
