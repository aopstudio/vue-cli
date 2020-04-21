<template>
    <div class="container" id="app">
        <div class="text-center">
            <h1>技术发展史（排名不分先后）</h1>
            <div v-for="data in list" :key=data.headline style="margin: 15px;">
                <el-link @click="jump(data.headline)" style="font-size: 25px;padding: 15px;">{{data.headline}}</el-link>
            </div>
        </div>
        <h2>新建内容</h2>   
        <div class="form-group">
            <h3>标题</h3>
            <el-input type="text" class="form-control" placeholder="标题" v-model='title.headline'></el-input>
            <h3>基本信息</h3>
            <el-input type="textarea" class="form-control" rows="3" placeholder="基本信息" v-model='title.text'></el-input>
        </div>
        <el-button type="primary" @click='addData()'>提交</el-button>
    </div>
</template>
<style scoped>
 .form-group{
    margin: 10px 25%;
 }
</style>
<script>
export default {
    name:"Timelist",
    data(){
        return{
            list:[],
            title:{
                headline:'',
                text:''
            }
        }
    },
    mounted: function(){
        this.loadData();
    },
    methods: {
        loadData: function(){
            let me=this;
            axios.get('http://localhost:8080/timeline/title')
            .then(function (response){
                me.list=response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        jump(headline){
            this.$router.push('/timeline/'+headline);
        },
        addData: function(){
            let me=this;
            axios.post('http://localhost:8080/timeline/title',this.title)
            .then(function (res){
                me.title.headline='';
                me.title.text='';
                me.loadData();
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
}
</script>
