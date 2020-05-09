<template>
    <el-row>
        <el-col :span=16>
            <el-form :model="user" ref="user" style="margin-left:50%">
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input type="password" v-model="user.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submit()">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
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
                let token=response.data.token;
                if(token.startsWith("Bearer")){
                    localStorage.setItem('token',token);
                    localStorage.setItem('username',response.data.username);
                    localStorage.setItem('role',response.data.role);
                    me.$store.commit("login",true);
                    if(response.data.role=="ROLE_ADMIN"||response.data.role=="ROLE_ROOT"){
                        me.$store.commit("admin",true);
                    }
                    if(response.data.role=="ROLE_ROOT"){
                        me.$store.commit("root",true);
                    }
                    window.alert('登录成功');
                    me.$router.push('/')
                }
                else
                    window.alert('用户名或密码错误');
                
            })
            .catch(function (error) {
                window.console.log(error);
            });
            
        }
    }
}
</script>

<style>

</style>