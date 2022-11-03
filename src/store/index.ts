import { defineStore } from "pinia";
import { Names } from "./store-namespace";
import { getAdminInfoApi } from "../request/api";

//定义menus对象的接口
interface MenuObj {
  parentId: number;
  id: number;
  children?: MenuObj[];
}
//仓库数据的menus格式
interface State {
  menus: MenuObj[];
}
// 二级菜单的menus
interface NewMenus {
  [key: number]: MenuObj;
}

export const useUserStore = defineStore<string, State,any>(Names.User, {
  state: () => {
    return {
      menus: [],
    };
  },
  //类似于computed 可以帮我们去修饰我们的值
  getters: {
    getNewMenus(state: State) {
      const newMenus: NewMenus = {};
      const menus = state.menus;
      for (let i = 0; i < menus.length; ++i) {
        if (menus[i].parentId === 0) {
          //浅拷贝，时刻关联state里的menu
          newMenus[menus[i].id] = { ...menus[i] };
        }
      }
      for (let i = 0; i < menus.length; ++i) {
        if (menus[i].parentId !== 0) {
          let parentId = menus[i].parentId;
          newMenus[parentId] = newMenus[parentId] || {};
          newMenus[parentId].children = newMenus[parentId].children || [];
          newMenus[parentId].children?.push(menus[i]);
        }
      }
      return newMenus;
    },
  },
  //可以操作异步 和 同步提交state
  actions: {
    async getUserInfo() {
      const res = await getAdminInfoApi();
      if (res.code === 200) {
        this.menus = res.data.menus;
      }
    },
  },
},{
  persist: true
});
