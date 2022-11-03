import request from './request';

//登录接口参数类型
interface AdminLoginData {
    password: string,
    username: string
}
//定义Promise类型
type PromiseRes<T = {}> = Promise<ManageResult<T>>

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
//获取用户数据列表的接口
interface AdminListParams {
    keyword: string; 
    pageNum: Number; 
    pageSize: Number
}



//登录返回token
export const adminLoginApi = (data: AdminLoginData):PromiseRes<AdminLoginRes> => request.post('/admin/login',data)
//获取当前用户信息
export const getAdminInfoApi = ():PromiseRes<AdminInfoRes> => request.get('/admin/info')

//获取用户数据列表
export const getAdminList = (data :AdminListParams):PromiseRes<{list: {}[]}> => request.get('/admin/list',{params: data})

//修改用户信息
export const updateAdmin = (id:number, data :AdminObjItf):PromiseRes => request.post('/admin/update/'+id,  data)
