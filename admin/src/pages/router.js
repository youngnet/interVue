import user from './user/router';
import course from './course/router';
import wx from './wx/router';
import login from './login/router';

function getRouter(arry){
	let routers =[]
	arry.forEach((item)=>{
		routers = routers.concat(item);
	});
	return routers;
}
export default getRouter([user,course,wx,login]);
