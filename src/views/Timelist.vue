<template>
    <div class="container" id="app">
        <div class="text-center">
            <el-row :gutter=10 >
                <el-col :span=8 v-for="item in list" :key="item.headline">
                <div style="margin-top:20px"> 
                    <el-card> 
                    <div style="padding: 15px;">
                        <div style="height:20px">{{item.headline}}</div>
                        <div class="bottom clearfix">
                        <div class="time"></div>
                        <el-button type="text" class="button" @click="jump(item.headline)">查看</el-button>
                        </div>
                    </div>
                    </el-card>
                </div>
                </el-col>
            </el-row>
            <!--<h1>技术发展史（排名不分先后）</h1>
            <div v-for="data in list" :key=data.headline style="margin: 15px;">
                <el-link @click="jump(data.headline)" style="font-size: 25px;padding: 15px;">{{data.headline}}</el-link>
            </div>-->
        </div>
        <div class="form-group" v-if="this.$store.state.logged">
            <h2>新建内容</h2>  
            <h3>标题</h3>
            <el-input type="text" class="form-control" placeholder="标题" v-model='title.headline'></el-input>
            <h3>基本信息</h3>
            <el-input type="textarea" class="form-control" rows="3" placeholder="基本信息" v-model='title.text'></el-input>
            <el-button type="primary" @click='addData()' style="margin-top:10px">提交</el-button>
        </div>
    </div>
</template>
<style scoped>
 .form-group{
    margin: 50px 25%;
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
            },
            logged:false,
        }
    },
    mounted: function(){
        if(localStorage.getItem('token'))
            this.logged=true;
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
