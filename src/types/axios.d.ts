//登录接口参数类型
interface AdminLoginData {
  password: string,
  username: string
}
//定义Promise类型
type PromiseRes<T = {}> = Promise<ManageResult<T>>

//所有接口返回值泛型
interface ManageResult<T = {}> {
  code?: number;
  data: T;
  errno?: number;
  errmes: "";
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