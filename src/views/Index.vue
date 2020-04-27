<template>
  <el-container id="index">
    <NavBar></NavBar>
    <router-view/>
    <el-footer>
      <div style="margin-left:40%">
      <el-link href="http://www.beian.miit.gov.cn">浙ICP备17039448号-1   </el-link>
      </div>
    </el-footer>
  </el-container>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  margin: 10px;
  text-align: left;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  name: "App",
  data(){
    return{
      logged:false,
    }
  },
  mounted(){
    if(localStorage.getItem('token'))
      this.logged=true;
  },
  methods:{
    logout(){
      localStorage.removeItem('token');
      this.logged=false;
      window.alert('注销成功');
      this.$forceUpdate();
    },
    login(){
      this.$router.push('/login');
    }
  },
  computed: {
    isLogin(){
      return localStorage.getItem('token');
    }
  },
  components:{
    NavBar:NavBar,
  }
}
</script>