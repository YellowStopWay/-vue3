import request from './request';

//登录接口参数类型
interface AdminLoginData {
    password: string,
    username: string
}
//定义Promise类型
type PromiseRes<T> = Promise<ManageResult<T>>

//所有接口返回值泛型
interface ManageResult<T = {}> {
    code: number;
    data: T;
    //message: string;
}

//登录接口返回值类型
interface AdminLoginRes {
    token: string;
    tokenHead: string;
} 
//获取用户信息返回值类型
interface AdminInfoRes {
    menus:[];

}

//登录返回token
export const adminLoginApi = (data: AdminLoginData):PromiseRes<AdminLoginRes> => request.post('/admin/login',data)
//获取当前用户信息
export const getAdminInfoApi = ():PromiseRes<AdminInfoRes> => request.get('/admin/info')