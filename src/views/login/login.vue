<template>
	<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm">
		<el-form-item prop="username">
			<el-input v-model="ruleForm.username" type="text" autocomplete="off" />
		</el-form-item>
		<el-form-item prop="pwd">
			<el-input v-model="ruleForm.pwd" type="password" autocomplete="off" />
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm()">登录</el-button>
		</el-form-item>
	</el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref, toRefs, toRef } from 'vue'
import { adminLoginApi, getAdminInfoApi } from '../../request/api';
import Cookie from 'js-cookie'
import { useRouter } from 'vue-router';
import {useUserStore} from '../../store'

const User = useUserStore();

const state = reactive({
	ruleForm: {
		username: '',
		pwd: ''
	}
})
//校验guize
const validatePass = (rule: unknown, value: string | undefined, callback: (msg?: string) => void) => {
	if (value === '') {
		callback('密码不能为空')
	} else {
		callback()
	}
}
//校验规则
const rules = reactive({
	username: [{
		required: true, message: '用户名不能为空', trigger: 'blur'
	}],
	pwd: [{
		validator: validatePass, trigger: 'blur'
	}]
})
//解构
let { ruleForm } = toRefs(state)
//获取表单对象元素
let ruleFormRef = ref();
//获取路由对象
const router = useRouter();

const submitForm = () => {
	ruleFormRef.value.validate().then(() => {
		adminLoginApi({
			password: ruleForm.value.pwd,
			username: ruleForm.value.username
		}).then(res => {
      if(res.code === 200){
        //存储token
        Cookie.set('token',res.data.tokenHead+res.data.token,{expires: 7})
				User.getUserInfo();
				router.push('/index');
				
        // getAdminInfoApi().then(res => {
        //   if(res.code === 200){
				// 		User.menus = res.data.menus;
				// 		console.log(User.menus);
        //     router.push('/home')
        //   }
        // })
      }
    })
	}).catch(() => {
		console.log('失败');

	})
}
</script>
  