<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" label="编号" />
    <el-table-column prop="username" label="帐号" />
    <el-table-column prop="nickName" label="姓名" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column label="添加时间">
      <template #:default="scope">
        {{ formatDate(scope.row.createTime) }}
      </template>
    </el-table-column>
    <el-table-column label="最后登录">
      <template #default="scope">
        {{ formatDate(scope.row.loginTime) }}
      </template>
    </el-table-column>
    <el-table-column label="是否启用">
      <template #default="scope">
        <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0"></el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button @click="allocRole(row.id)" text>
          分配角色
        </el-button>
        <el-button @click="editAdmin(row)" text>
          编辑
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <EditAdmit :visible="visible" :form="rowData" @close="closeDialog"></EditAdmit>
  <EditRole :visible="roleVisible" :form="roleData" @close="closeRoleDialog"></EditRole>

</template>

<script setup lang='ts'>
import { reactive, toRefs } from 'vue';
import { getAdminList,getRoleListAll,getAdminRoleById } from '../../request/api'
import EditAdmit from './components/EditAdmit.vue';
import EditRole from './components/EditRole.vue';
const state = reactive<{ tableData: {}[]; visible: boolean; rowData: {}; roleVisible: boolean;roleData: AdminRoleFormData }>({
  tableData: [],
  visible: false,
  rowData: {},
  roleVisible: false,
  roleData: {
    userRoles: [],
    roleLists: [],
    adminId: 0
  }
})
const { tableData, visible, rowData, roleVisible, roleData } = toRefs(state);

//获取最新表格数据
const fetchData = () => {
  getAdminList({
    keyword: '',
    pageSize: 10,
    pageNum: 1
  }).then(res => {
    if (res.code === 200) {
      tableData.value = res.data.list
    }
  })
}
fetchData()
//获取所有角色
getRoleListAll().then(res => {
  if(res.code === 200){
    roleData.value.roleLists = res.data;
  }
})

//补0函数
const addZero = (num: number) => {
  return num < 10 ? '0' + num : num
}

//格式化时间
const formatDate = (time?: string) => {
  if (!time) return '';
  let date = new Date(time);
  let year = addZero(date.getFullYear());
  let month = addZero(date.getMonth() + 1);
  let day = addZero(date.getDay());
  let hours = addZero(date.getHours());
  let minutes = addZero(date.getMinutes());
  let seconds = addZero(date.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

//分配角色事件点击
const allocRole = (id: number) => {
  getAdminRoleById(id).then(res => {
    if(res.code === 200){
      roleVisible.value= true;
      roleData.value.userRoles = res.data;
      roleData.value.adminId = id;
    }
  })
}

//点击编辑按钮
const editAdmin = (row: AdminObjItf) => {
  rowData.value = row;
  visible.value = true;
}

//隐藏编辑弹框
const closeDialog = (r?: string) => {
  visible.value = false;
  rowData.value = {};
  if (r === 'reload'){
    fetchData()
  }
}
//隐藏分配角色弹框
const closeRoleDialog = () => {
  roleVisible.value = false;
}


</script>

<style lang="less" scoped>
  #elb{
    width: 30px;
    height: 30px;
    position: fixed;
    right: 200px;
    top: 100px;
  }
</style>