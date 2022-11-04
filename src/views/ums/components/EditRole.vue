<template>
<el-dialog v-model="visible" title="分配角色" :before-close="close">
    <el-form :model="form">
      <el-form-item >
        <el-select multiple v-model="roles" placeholder="请分配角色权限">
          <el-option v-for="role in form.roleLists"  :label="role.name" :value="role.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="updateRole">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import {defineProps,reactive,ref,watch} from 'vue'
import {updateAdminRole} from '../../../request/api'
type NU = number | undefined;

const roles = ref<NU[]>([]);
const props = defineProps<{
  visible: boolean;
  form: AdminRoleFormData
}>()

const emits = defineEmits<{
  (event: 'close'):void
}>();
//监听
watch(() => props.form.userRoles,() => {
  if(props.form.userRoles){
    roles.value = props.form.userRoles.map(item => item.id)
  }
})

const close = () => {
  emits('close')
}
const updateRole = () => {
  updateAdminRole({adminId :props.form.adminId,roleIds:roles.value.join(',')}).then(res => {
    if(res.code === 200){
      close();
    }
  })
}
</script>

