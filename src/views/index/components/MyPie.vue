<template>
     <el-radio-group v-model="selectLabel" size="large" @change="dataChange">
      <el-radio-button label="sale_" >销量</el-radio-button>
      <el-radio-button label="_money" >销售额</el-radio-button>
    </el-radio-group>
    <el-select v-model="selectDay"  placeholder="Select" @change="dataChange">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.name"
      :value="item.value"
    />
  </el-select>
  <div id="pie" style="width: 100%;height:350px">
  </div>
</template>

<script setup lang='ts'>
import { defineProps, onMounted, reactive, toRefs, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
  data: {}[]
}>()

const state = reactive({
  selectLabel: '_money',
  selectDay: 'today',
  options: [
    {name: '今天',value: 'today'},
    {name: '昨天',value: 'yesterday'},
    {name: '前三天',value: 'three_days'},
    {name: '前七天',value: 'seven_days'},

  ],
})
const {selectLabel,selectDay,options,} = toRefs(state);

const dataChange = () => {
  initPie();
}

let myChart: echarts.ECharts ;

const initPie = () => {
  let key ='';
  if(selectLabel.value === '_money'){
    key = selectDay.value + selectLabel.value
  }else{
    key = selectLabel.value + selectDay.value
  }
  const arr = props.data.map((item:{[key:string]: string}) => ({ value: item[key], name: item.name }))
  if(!myChart){
    myChart = echarts.init(document.getElementById('pie') as HTMLDivElement)
  }
  var option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 20,
      right: 10,
      width: 300,
      height: 100,
      orient: 'vertical'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['30%','60%'],
        label: {
          show: true,
        },
        labelLine: {
          show: true
        },
        data: arr
      }
    ]
  };
  option && myChart.setOption(option);
}

//等有效数据传入之后再生成echarts
watch(() => props.data, () => {
  initPie();
})

</script>
