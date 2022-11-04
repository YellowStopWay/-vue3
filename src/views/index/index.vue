<template>
<MyPie :data="state.salePie"></MyPie>
</template>

<script setup lang='ts'>
import { reactive } from 'vue';
import {getAdminStat} from '../../request/api'
import MyPie from './components/MyPie.vue'
const state = reactive<{salePie:{}[]}>({
   salePie: []
})
getAdminStat().then(res => {
   if(res.errno === 0){
      state.salePie = res.data.salePie;
   }
})
</script>

