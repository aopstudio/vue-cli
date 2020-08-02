<template>
    <el-container>
        <el-menu>
            <el-menu-item v-for="item in userList" :key="item.id" :index="item.id">
                {{item.name}}
            </el-menu-item>
        </el-menu>
        <el-menu>
            <el-menu-item v-for="item in adminList" :key="item.id" :index="item.id">
                {{item.name}}
            </el-menu-item>
        </el-menu>
    </el-container>
</template>

<script>
export default {
    name: 'Password',
    data(){
        return {
            password:{
                oldp:'',
                newp:'',
                token:localStorage.getItem('token'),
                userList:[],
                adminList:[]
            }
        }
    },
    mounted(){
        this.loadUser();
        this.loadAdmin();
    },
    methods:{
        submit(){
            let me=this;
            axios.post('http://localhost:8080/user/changeRole',me.password,
            {
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            })
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
        },
        loadUser(){
            let me=this;
            axios.get('http://localhost:8080/user/loadRole',
            {
                params:{
                    role:"ROLE_USER"
                }
            })
            .then(function (response){
                //console.log(response.data);
                me.userList=response.data
            })
            .catch(function (error) {
                window.console.log(error);
            });
        },
        loadAdmin(){
            let me=this;
            axios.get('http://localhost:8080/user/loadRole',
            {
                params:{
                    role:"ROLE_ADMIN"
                }
            })
            .then(function (response){
                //console.log(response.data);
                me.adminList=response.data
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