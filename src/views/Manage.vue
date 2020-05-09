<template>
    <el-container>
        <el-header id="nav">
        <el-col :span=21>
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal"  router>
            <!--<el-menu-item index="/info">个人资料</el-menu-item>-->
            <el-menu-item index="/password">修改密码</el-menu-item>
            <el-menu-item index="/changeRole" v-if="$store.state.isRoot">修改用户权限</el-menu-item>
        </el-menu>
        </el-col>
        <el-col :span=3 style="margin-top:20px">
            <el-button @click="home" style="margin-left:10%">首页</el-button>
            <el-button @click="logout">注销</el-button>
        </el-col>
        </el-header>
        <el-main>
            <router-view/>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: 'Manage',
    methods:{
        logout(){
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            this.$store.commit("login",false);
            this.$store.commit("admin",false);
            window.alert('注销成功');
            this.$router.push('/');
        },
        home(){
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>

</style>