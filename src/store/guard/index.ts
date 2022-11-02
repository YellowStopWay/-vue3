import router from "../../router";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { useUserStore } from "..";
import Cookies from "js-cookie";
import { getAdminInfoApi } from "../../request/api";
import { RouteRecordRaw } from "vue-router";

const token = Cookies.get("token");
nProgress.configure({
  showSpinner: false,
});

router.beforeEach(async (to, from,next) => {
  nProgress.start();

  const User = useUserStore();
  const token = Cookies.get("token");
  if (token && User.menus.length === 0) {
    const res = await getAdminInfoApi();
    if (res.code === 200) {
      User.menus = res.data.menus;
    }

    //循环菜单，生成并注册动态路由
    const menus = User.getNewMenus;
    for (let key in menus) {
      const newRoute: RouteRecordRaw = {
        path: "/" + menus[key].name,
        name: menus[key].name,
        component: () => import("../../views/home/home.vue"),
        redirect: "/" + menus[key].name + "/" + menus[key].children[0].name,
        children: [],
      };
      for (let i = 0; i < menus[key].children.length; ++i) {
        newRoute.children?.push({
          path: menus[key].children[i].name,
          name: menus[key].children[i].name,
          component: () =>
            import(
              `../../views/${menus[key].name}/${menus[key].children[i].name}.vue`
            ),
        });
      }

      //动态生成菜单路由
      router.addRoute(newRoute);
    }
    //动态添加首页
    const route: RouteRecordRaw= {
      path: "/",
      name: "home",
      component: () => import("../../views/home/home.vue"),
      redirect: "/index",
      children: [
        {
          path: "index",
          name: "index",
          component: () => import("../../views/index/index.vue"),
        },
      ],
    }
    router.addRoute(route);
    next(to.path)
  }else{
    if(token && to.path === '/login'){
      next(from)
    }else if(!token && to.path !== '/login'){
      next('/login')
    }else next()
  }
});

// 全局后置钩子
router.afterEach(() => {
  nProgress.done(true);
});
