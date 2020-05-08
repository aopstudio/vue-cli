<template>
  <el-row>
        <el-col :span=16>
            <el-form :model="user" ref="user" style="margin-left:50%">
                <el-form-item prop="old" label="输入原密码">
                    <el-input type="password" v-model="password.oldp"></el-input>
                </el-form-item>
                <el-form-item prop="new" label="输入新密码">
                    <el-input type="password" v-model="password.newp"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submit()" type="primary">修改</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'Password',
    data(){
        return {
            password:{
                oldp:'',
                newp:'',
                token:localStorage.getItem('token')
            }
        }
    },
    methods:{
        submit(){
            let me=this;
            axios.post('http://localhost:8080/user/changePassword',me.password)
            .then(function (response){
                //console.log(response.data);
                if(response.data=="wrong"){
                    window.alert('原密码错误');
                }
                if(response.data=="success"){
                    window.alert('修改成功');
                    me.$router.push('/');
                }
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