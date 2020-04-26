<template>
  <el-container id="app">
    <el-header id="nav">
      <el-col :span=21>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal"  router>
        <el-menu-item index="/">Home</el-menu-item>
        <el-menu-item index="/timelist">Timelist</el-menu-item>
        <el-menu-item index="/graph">Graph</el-menu-item>
        <el-menu-item index="/editor">Editor</el-menu-item>
      </el-menu> 
      </el-col>
      <el-col :span=3 style="margin-top:20px" v-if="!logged">
        <el-button @click="login" style="margin-left:10%">登录</el-button>
        <el-button @click="register">注册</el-button>
      </el-col>
      <el-col :span=3 style="margin-top:20px" v-if="logged">
        <el-button @click="manage" style="margin-left:10%">管理</el-button>
        <el-button @click="logout">注销</el-button>
      </el-col>
    </el-header>
    <router-view/>
    <el-footer>
      <div style="margin-left:40%">
      <el-link href="http://www.beian.miit.gov.cn">浙ICP备17039448号-1 </el-link>
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
  }
}
</script>