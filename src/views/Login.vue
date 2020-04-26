<template>
  <el-form :model="user" ref="user">
        <el-form-item prop="username" label="用户名">
            <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="submit">登录</el-button>
        </el-form-item>
  </el-form>
</template>

<script>
export default {
    name:'Login',
    data(){
        return{
            user: {
                username:'',
                password:''
            },
            token:''
        }
    },
    methods:{
        submit(){
            let me=this;
            axios.post('http://localhost:8080/auth/login',me.user)
            .then(function (response){
                //console.log(response.data);
                if(response.data.startsWith("Bearer"))
                    localStorage.setItem('token',response.data);
                else
                    window.alert('用户名或密码错误')
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
}
</script>

<style>

</style>