<template>
  <el-container>
    <el-aside width="20%">
      <el-menu>
        <el-menu-item v-for="item in tutorial_catagory_list" :key="item.id" :index="item.id" @click="loadTitle(item.id)">
          {{item.name}}
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="home">
      <el-row :gutter=10 >
        <el-col :span=8 v-for="item in tutorial_title_list" :key="item.id">
          <div style="margin-top:20px"> 
            <el-card> 
              <div style="padding: 15px;">
                <div style="height:20px">{{item.headline}}</div>
                <div class="bottom clearfix">
                  <div class="time"></div>
                  <el-button type="text" class="button" @click="jump(item.id)">开始学习</el-button>
                  <el-button v-if="$store.state.isAdmin" type="warning" style="margin-left:80%" @click="deleteTutorial(item.id)">删除</el-button>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="this.$store.state.isAdmin" style="margin-top:10px">
        <el-col :span=8>
          <el-input type="text" v-model="new_title.headline" placeholder="输入新课程标题"></el-input>
          <el-button @click="add" style="margin-top:10px">新建</el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<style scoped>
  el-row{
    flex-wrap: wrap;
  }
</style>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  data(){
    return {
      tutorial_catagory_list:[],
      tutorial_title_list:[],
      new_title:{
        headline:'',
        catagory_id:0
      },
      logged:false,
      isAdmin:this.$store.state.isAdmin
    }
  },
  mounted(){
    this.loadCatagory();
  },
  methods:{
    loadTitle(id){
      let me=this;
      axios.get('http://localhost:8080/tutorial/title',{
        params:{
            catagoryId:id
        }
      })
      .then(function (response){
          me.tutorial_title_list=response.data;
          me.new_title.catagory_id=id;
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    deleteTutorial(title_id){
      let me=this;
      axios.get('http://localhost:8080/tutorial/deleteTitle',
      {
        params:{
          titleId:title_id
        }
      },
      )
      .then(function (response){
          window.alert("删除成功");
          me.loadCatagory();
      })
      .catch(function (error) {
          window.console.log(error);
      });
    },
    loadCatagory(){
      let me=this;
      axios.get('http://localhost:8080/tutorial/catagory')
      .then(function (response){
          me.tutorial_catagory_list=response.data;
          me.loadTitle(me.tutorial_catagory_list[0].id);
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    jump(id){
      this.$router.push('/tutorial/'+id);
    },
    add(){
      let me=this;
      axios.post('http://localhost:8080/tutorial/title',me.new_title,
      {
          headers:{
              'Authorization':localStorage.getItem('token')
          }
      })
      .then(function(response){
        window.alert("添加成功");
        me.loadTitle(me.new_title.catagory_id)
      })
      .catch(function (error) {
          console.log(error);
      });
    }
  },
   computed: {
      listenlogged() {
        return this.$store.state.logged;
      }
    },
    watch:{
      listenlogged:function(old,newd){
        console.log(old)
        this.logged = old;
      }
    }
}
</script>
