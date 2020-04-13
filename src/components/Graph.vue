<template>
   
<div id="myChart"></div>
</template>

<style>
    #myChart{
        width: 100%;
        height: 1000px;
    }
</style>
<script>
export default {
    name:"Graph",
    data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      categories: [],
      resData: [],
      graphData: [],
      graphLinks: []
    }
  },
  mounted(){
    for (var i = 0; i < 2; i++) {
        this.categories[i] = {
            name: '类目' + i
        };
    }
    this.loadData();
    //this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
            title: {
              text: 'ECharts 关系图'
            },
            tooltip: {},
            
            series: [{
              type: 'graph', // 类型:关系图
                layout: 'force', //图的布局，类型为力导图
                symbolSize: 40, // 调整节点的大小
                roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [2, 10],
                edgeLabel: {
                    normal: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                force: {
                    repulsion: 2500,
                    edgeLength: [10, 50]
                },
                draggable: true,
                lineStyle: {
                    normal: {
                        width: 2,
                        color: '#4b565b',
                    }
                },
                edgeLabel: {
                    normal: {
                        show: true,
                        formatter: function (x) {
                            return x.data.name;
                        }
                    }
                },
                label: {
                    normal: {
                        show: true,
                        textStyle: {}
                    }
                },
                data: this.graphData,
                links: this.graphLinks,
                categories: this.categories,
            }]
        });
    },
    loadData(){
        let me=this;
        axios.get('http://localhost:8080/graph/all')
        .then(function (response){
            me.resData=response.data;
            for(var i=0,len=response.data.length;i<len;i++){
                me.graphData.push({
                    name: me.resData[i].name,
                    des: 'nodedes05',
                    symbolSize: 50,
                    category: 1,
                });
                if("includes" in me.resData[i]){
                    let dataIncludes=me.resData[i].includes;
                    for(var j=0,lenj=dataIncludes.length;j<lenj;j++){
                        me.graphLinks.push({
                            source: me.resData[i].name,
                            target: dataIncludes[j].name,
                            name: '包含',
                            des: j
                        })
                    }
                } 
                if("derives" in me.resData[i]){   
                    let dataDerives=me.resData[i].derives;
                    for(var j=0,lenj=dataDerives.length;j<lenj;j++){
                        me.graphLinks.push({
                            source: me.resData[i].name,
                            target: dataDerives[j].name,
                            name: '衍生出',
                            des: j
                        })
                    }
                }        
            }
            me.drawLine();
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  }
}
</script>