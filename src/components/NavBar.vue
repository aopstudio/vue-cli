<template>
    <el-header id="nav">
      <el-col :span=21>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal"  router>
        <el-menu-item index="/">Home</el-menu-item>
        <el-menu-item index="/timelist">Timelist</el-menu-item>
        <el-menu-item index="/graph">Graph</el-menu-item>
      </el-menu> 
      </el-col>
      <el-col :span=3 style="margin-top:20px" v-if="!this.$store.state.logged">
        <el-button @click="login" style="margin-left:10%">登录</el-button>
        <el-button @click="register">注册</el-button>
      </el-col>
      <el-col :span=3 style="margin-top:20px" v-if="this.$store.state.logged">
        <el-button @click="manage" style="margin-left:10%">管理</el-button>
        <el-button @click="logout">注销</el-button>
      </el-col>
    </el-header>
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
  name: "NavBar",
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
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      this.$store.commit("login",false);
      this.$store.commit("admin",false);
      this.logged=false;
      window.alert('注销成功');
      this.$router.push('/');
    },
    login(){
      this.$router.push('/login');
    },
    register(){
        this.$router.push('/register');
    },
    manage(){
      this.$router.push('/manage');
    }
  },
  computed: {
    isLogin(){
      return localStorage.getItem('token');
    }
  },
}
</script>