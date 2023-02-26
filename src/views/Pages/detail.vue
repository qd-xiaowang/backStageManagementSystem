<template>
  <div class="dashboard-fullscreen">
    <!-- 顶部两个图 -->
    <div class="topPic">
      <!-- 各部门人数 -->
      <div class="distribution-progress"></div>
      <!-- 进度分布 -->
      <div class="rate-progress"></div>
    </div>

  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted,ref } from 'vue'
import axios from 'axios'
onMounted(() => {
  // getMList()
  distributionprogress(), rateprogress()
})

	// const getMList = async () => {
	// };
	

// 上左柱状图 各部门人数
const distributionprogress = async () => {
	const res = await axios.post('http://127.0.0.1:3007/w/getwarehouse')
	let jiayong = []
	let gongchang = []
	let qiye = []
	let huanbao = []
	// console.log(res.data[0].category)
	res.data.forEach((element)=>{
		if(element.category == '家用'){
			jiayong.push(element)
		}
		if(element.category == '工厂'){
			gongchang.push(element)
		}
		if(element.category == '企业'){
			qiye.push(element)
		}
		if(element.category == '环保'){
			huanbao.push(element)
		}
	})
	const data1 = [jiayong.length,gongchang.length,qiye.length,huanbao.length]
  // echarts初始化 这些都是官网文档有的
  const dp = echarts.init(document.querySelector('.distribution-progress'))
  document.querySelector('.distribution-progress').setAttribute('_echarts_instance_', '')
  // echarts的一些api
  dp.setOption({
    //标题组件
    title: {
      text: '各仓库数量',
      top: 20,
      height: 50,
      left: 15,
      textStyle: {
        fontSize: 14,
        fontWeight: '400',
        color: 'rgba(0,0,0,1)',
        fontStyle: 'normal',
        fontFamily: 'Microsoft YaHei',
      },
    },
    // 图例组件
    legend: {
      data: ['各仓库数量'],
      top: '8%',
      orient: 'vertical',
      icon: 'rect',
      itemWidth: 42,
      itemHeight: 14,
      backgroundColor: 'transparent',
      itemStyle: {
        opacity: 1,
        shadowColor: '#fff',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,
        borderCap: 'butt',
        // borderType: "solid"
      },
    },
    // 直角坐标系grid中的x轴
    xAxis: {
      nameTextStyle: {
        fontFamily: 'Microsoft YaHei',
      },
      type: 'category',
      data: ['家用', '工厂', '企业','环保'],
      splitLine: {
        show: true,
        lineStyle: {
          type: 'solid', //y轴分割线类型
          color: 'rgb(224,230,241)',
          width: 1,
        },
      },
    },
    // 直角坐标系内绘图网格
    grid: {
      x: 50,
      y: 85,
      x2: 50,
      y2: 50,
      borderWidth: 1,
    },
    // 直角坐标系grid中的y轴
    yAxis: {
      nameTextStyle: {
        fontFamily: 'Microsoft YaHei',
      },
      min: 0,
      max: 90,
      // 间隔
      interval: 10,
      type: 'value',
    },
    // 系列列表
    series: [
      {
        name: '各仓库数量',
        type: 'bar',
        barWidth: 60,
        data: data1,
        itemStyle: {
          color: '#8dcfea',
        },
      },
    ],
  })
  // echarts响应式,这个需要记一下
  window.addEventListener('resize', function () {
    dp.resize()
  })
}


const rateprogress = async () => {
	const res = await axios.post('http://127.0.0.1:3007/w/getwarehouse')
	let jiayong = []
	let gongchang = []
	let qiye = []
	let huanbao = []
	// console.log(res.data[0].category)
	res.data.forEach((element)=>{
		if(element.category == '家用'){
			jiayong.push(element)
		}
		if(element.category == '工厂'){
			gongchang.push(element)
		}
		if(element.category == '企业'){
			qiye.push(element)
		}
		if(element.category == '环保'){
			huanbao.push(element)
		}
	})
	const data1 = [{value:jiayong.length,name:"家用"
	},
	{value:gongchang.length,name:"国产"},
	{value:qiye.length,name:"企业"},
	{value:huanbao.length,name:'环保'}]
	
  const rp = echarts.init(document.querySelector('.rate-progress'))
  document.querySelector('.rate-progress').setAttribute('_echarts_instance_', '')
  rp.setOption({
    title: {
      text: '产品占比',
      top: 20,
      height: 50,
      left: 15,
      textStyle: {
        fontSize: 14,
        fontWeight: 'normal',
        color: 'rgba(0,0,0,1)',
        fontStyle: 'normal',
        fontFamily: 'Microsoft YaHei',
      },
    },
    // 提示框组件
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: 65,
      left: 25,
      // 标签垂直
      orient: 'vertical',
      icon: 'rect',
      // 标签间距
      itemGap: 8,
      itemWidth: 42,
      itemHeight: 14,
      backgroundColor: 'transparent',
      itemStyle: {
        opacity: 1,
        shadowColor: 'rgba(255, 255, 255, 1)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,
        borderCap: 'butt',
        // 边框类型 ： 直线
        borderType: 'solid',
      },
    },
    grid: {
      left: '30%',
      borderWidth: 1,
    },
    color: ['#F6C659','#4B47F4', '#EEF93F', '#FF7575'],
    series: [
      {
        type: 'pie',
        emphasis: {
          scale: false,
        },
        center: ['58%', '53%'],
        radius: ['36%', '72%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },

        labelLine: {
          show: false,
        },
        data: data1,
      },
    ],
  })
  window.addEventListener('resize', function () {
    rp.resize()
  })
}



</script>

<style lang="scss" scoped>
.dashboard-fullscreen {
  height: 100%;
  padding: 8px 8px;
  display: flex;
  // 主轴从上到下
  flex-direction: column;
  overflow: auto !important;
  background: #eee;

  /* 顶部布局 */
  .topPic {
    height: calc(70% - 8px);
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;

    .distribution-progress {
      width: calc(50% - 8px);
      margin-right: 8px;
      height: 100%;
      background-color: rgb(255, 255, 255);
      position: relative;
      display: flex;
    }

    .rate-progress {
      display: flex;
      width: calc(50%);
      height: 100%;
      position: relative;
      background-color: rgb(255, 255, 255);
    }
  }
}

/* 中间布局 */
.midPic {
  height: 50%;
  display: flex;
  flex-direction: row;

  .a {
    display: flex;
    width: calc(40% - 8px);
    margin-right: 8px;
    height: 100%;
    position: relative;
    background-color: rgb(255, 255, 255);
  }

  .b {
    display: flex;
    width: calc(60%);
    height: 100%;
    position: relative;
    background-color: rgb(255, 255, 255);
  }
}
</style>
