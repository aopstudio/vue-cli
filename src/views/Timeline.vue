<template>
    <div class="app">
        <div id='timeline-embed' style="width: 100%; height: 600px"></div>
        <div class="timeline-panel" v-if="this.$store.state.logged">
          <div class="tldate"><el-input type="number" placeholder="年份" v-model="startYear"></el-input></div>
          <div class="tl-heading">
            <el-input type="text" placeholder="标题" v-model="textHeadline"></el-input>
          </div>
          <div class="tl-body">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textText"></el-input>
          </div>
          <el-button id="submit" type="primary" @click="newThing()">提交</el-button>
          <div class="deleteThing" style="margin-top:50px">
          <el-select v-model="value" placeholder="请选择要删除的事件" v-if="$store.state.isAdmin">
            <el-option
            v-for="item in timelineData.events"
            :key="item.id"
            :label="item.text.headline"
            :value="item.id">
            </el-option>
          </el-select>
          <el-button id="del" type="primary" style="margin-left:50px" @click="deleteEvent">删除</el-button>
          </div>
      </div>
    </div>
</template>

<style scoped>
    .timeline-panel{
        text-align: center;
        margin: auto 25%;
    }
    .timeline-panel>div{
        margin: 10px auto;
    }
    #submit {
        margin: 0;
    }
</style>

<script>
export default {
    name:"Timeline",
    data(){
        return{
            timelineData:'',
            startYear:2020,
            textHeadline:'',
            textText:'',
            headline:this.$route.params.headline,
            logged:false,
            value:''
        }
    },
    mounted(){
        if(localStorage.getItem('token'))
            this.logged=true;
        this.loadData();
    },
    methods: {
        loadData: function(){
            let me=this;
            axios.get('http://localhost:8080/timeline/info',{
                params:{
                    headline:me.headline 
                }
            })
            .then(function (response){
                me.timelineData=response.data;
                window.timeline = new TL.Timeline('timeline-embed', response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        newThing(){
            let me=this;
            if(me.textHeadline==''){
                window.alert('请输入事件标题');
                return;
            }
            axios.post('http://localhost:8080/timeline/event',{
                start_year:me.startYear,
                text_headline:me.textHeadline,
                text_text:me.textText,
                headline:me.headline
            },
            {
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            })
            .then(function (response){
                me.loadData();
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        deleteEvent(){
            let me=this;
            if(me.value==''){
                window.alert("还未选择事件");
                return;
            }
            axios.get('http://localhost:8080/timeline/deleteEvent',{
                params:{
                    id:me.value
                },
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            }).then(function (response){
                me.loadData();
                window.alert("删除成功");
                me.value='';
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

}
</script>