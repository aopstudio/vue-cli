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
      <el-row gutter=20>
        <el-col :span=8 v-for="item in tutorial_title_list" :key="item.id">
          <div style="margin-top:15px"> 
            <el-card > 
              <span>{{item.headline}}</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">开始学习</el-button>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

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
    }
  }
}
</script>
