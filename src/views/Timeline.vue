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
            axios.post('http://localhost:8080/timeline/event',{
                start_year:me.startYear,
                text_headline:me.textHeadline,
                text_text:me.textText,
                headline:me.headline
            })
            .then(function (response){
                me.loadData();
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

}
</script>