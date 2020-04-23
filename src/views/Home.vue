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
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<style scoped>
  el-row{
    flex-wrap: wrap;
  }
  el-card{
    
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
      tutorial_title_list:[]
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
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    loadCatagory(){
      let me=this;
      axios.get('http://localhost:8080/tutorial/catagory')
      .then(function (response){
          me.tutorial_catagory_list=response.data;
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    jump(id){
      this.$router.push('/tutorial/'+id);
    }
  }
}
</script>
