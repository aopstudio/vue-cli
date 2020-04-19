<template>
<div>
    <el-form :model="search" ref="search">
        <el-form-item prop="name" label="关键词">
            <el-input v-model="search.name"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="submit">搜索</el-button>
        </el-form-item>
    </el-form>
    <div id="myChart"></div>
    <el-form :model="newItem" ref="newItem">
        <el-form-item prop="source" label="新建关系">
            <el-input v-model="newItem.from"></el-input>
        </el-form-item>
        <el-form-item prop="relation" label="关系">
            <el-select v-model="newItem.type" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="to">
            <el-input v-model="newItem.to"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="add">添加</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<style>
    #myChart{
        width: 100%;
        height: 500px;
    }
</style>
<script>
export default {
  name:"Graph",
  data () {
    return {
        options: [{
            value: 'includes',
            label: '包含'
        }, {
            value: 'derives',
            label: '衍生出'
        }, {
            value: 'relates',
            label: '联系'
        }],
        msg: 'Welcome to Your Vue.js App',
        categories: [],
        resData: [],
        graphData: [],
        graphLinks: [],
        newItem: {
            from:'',
            to:'',
            type:''
        },
        search: {
        name: ''
        }
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
    submit(){
        let me=this;
        axios.get('http://localhost:8080/graph/node',{
            params:{
                name:me.search.name, 
            }
        })
        .then(function (response){
            me.packNode(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    add(){
        let me=this;
        axios.post('http://localhost:8080/graph/node',me.newItem)
        .then(function (response){
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    packAll(data){
        this.graphData=[];
        this.graphLinks=[];
        for(var i=0,len=data.length;i<len;i++){
            this.graphData.push({
                name: data[i].name,
                des: 'nodedes05',
                symbolSize: 50,
                category: 1,
            });
            if("includes" in data[i]){
                let dataIncludes=data[i].includes;
                for(var j=0,lenj=dataIncludes.length;j<lenj;j++){
                    this.graphLinks.push({
                        source: data[i].name,
                        target: dataIncludes[j].name,
                        name: '包含',
                        des: j
                    })
                }
            } 
            if("derives" in data[i]){   
                let dataDerives=data[i].derives;
                for(var j=0,lenj=dataDerives.length;j<lenj;j++){
                    this.graphLinks.push({
                        source: data[i].name,
                        target: dataDerives[j].name,
                        name: '衍生出',
                        des: j
                    })
                }
            }        
        }
        this.drawLine();
    },
    packNode(data){
        this.graphData=[];
        this.graphLinks=[];
        for(var i=0,len=data.length;i<len;i++){
            this.graphData.push({
                name: data[i].name,
                des: 'nodedes05',
                symbolSize: 50,
                category: 1,
            });
            if("includes" in data[i]){
                let dataIncludes=data[i].includes;
                for(var j=0,lenj=dataIncludes.length;j<lenj;j++){
                    this.graphData.push({
                        name: dataIncludes[j].name,
                        des: 'nodedes05',
                        symbolSize: 50,
                        category: 1,
                    });
                    this.graphLinks.push({
                        source: data[i].name,
                        target: dataIncludes[j].name,
                        name: '包含',
                        des: j
                    })
                }
            } 
            if("derives" in data[i]){   
                let dataDerives=data[i].derives;
                for(var j=0,lenj=dataDerives.length;j<lenj;j++){
                    this.graphData.push({
                        name: dataDerives[j].name,
                        des: 'nodedes05',
                        symbolSize: 50,
                        category: 1,
                    });
                    this.graphLinks.push({
                        source: data[i].name,
                        target: dataDerives[j].name,
                        name: '衍生出',
                        des: j
                    })
                }
            }        
        }
        this.drawLine();
    },
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
            me.packAll(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  }
}
</script>