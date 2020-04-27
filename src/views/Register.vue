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
                <el-form-item prop="password" label="重复输入密码">
                    <el-input type="password" v-model="dpassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submit()">注册</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name:'Register',
    data(){
        return{
            user: {
                username:'',
                password:''
            },
            token:'',
            dpassword:''
        }
    },
    methods:{
        submit(){
            let me=this;
            axios.post('http://localhost:8080/auth/register',me.user)
            .then(function (response){
                //console.log(response.data);
                if(response.data.startsWith("Dup")){
                    window.alert('用户名已存在');
                }
                else{
                    window.alert('注册成功');
                    me.$router.push('/');
                }
                
            })
            .catch(function (error) {
                window.alert('未知错误，登录失败');
            });
            
        }
    }
}
</script>

<style>

</style>