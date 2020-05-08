<template>
  <el-main>
      <el-input type="text" v-model="content.headline"></el-input>
      <mavon-editor v-model="content.text" :toolbarsFlag="false" defaultOpen="preview" style="margin-top:15px"/>
      <el-button type="primary" @click="submit()">提交</el-button>
  </el-main>
</template>

<script>
export default {
    name:"Editor",
    data (){
        return{
            content:{
                title_id:this.$route.params.id,
                headline:'',
                text:''
            }
        }
    },
    methods:{
        submit(){
            let me=this;
            axios.post('http://localhost:8080/tutorial/content',me.content,
            {
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            })
            .then(function (response){
                me.content=response.data;
                window.alert("添加成功");
                me.$router.go(-1);
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