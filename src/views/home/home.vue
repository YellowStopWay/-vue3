<template>
	<div class="home_container">
		<div class="home_header">
			头部
		</div>
		<div class="home_menu">
			<el-row class="tac">
				<el-col :span="24">
					<h5 class="mb-2">Default colors</h5>
					<el-menu  class="el-menu-vertical-demo" :unique-opened="true" :router="true">
						<el-sub-menu :index="menu.id + ''" v-for="(menu) in newMenus" :key="menu.id">
							<template #title>
								<span>{{menu.title}}</span>
							</template>
							<template v-for="(subMenu) in menu.children" >
								<el-menu-item :index="'/'+menu.name+'/'+subMenu.name" v-if="!subMenu.hidden" :key="subMenu.id">{{subMenu.title}}</el-menu-item>
							</template>
						</el-sub-menu>
					</el-menu>
				</el-col>
			</el-row>
		</div>
		<div class="home_content"><RouterView></RouterView></div>
	</div>

</template>

<script setup lang='ts'>
import {useUserStore} from '../../store'
import { storeToRefs } from "pinia";
import {computed} from 'vue'
import { RouterView } from 'vue-router';

//定义menus对象的接口
interface MenuObj {
  parentId: number;
  id: number;
  children?: MenuObj[];
	hidden: 0 | 1;
	title: string;
	name: string;
}
// 二级菜单的menus
interface NewMenus {
  [key: number]: MenuObj;
}
const User = useUserStore();
const {menus} = storeToRefs(User)
// const newMenus = computed(() => User.getNewMenus) 也可以用计算属性
 const newMenus:NewMenus = User.getNewMenus;
console.log(menus);
console.log(newMenus);



</script>

<style lang="less" scoped>
.home_container {
	position: relative;
	height: 100%;

	.home_header {
		height: 100px;
		background-color: skyblue;
	}

	.home_menu {
		position: absolute;
		top: 100px;
		left: 0;
		bottom: 0;
		width: 250px;
		background-color: pink;
	}

	.home_content {
		position: absolute;
		top: 100px;
		left: 250px;
		bottom: 0;
		width: 1030px;
		background-color: yellow;
	}
}
</style>        