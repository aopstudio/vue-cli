<template>
  <el-main>
      <el-input type="text" v-model="article.title"></el-input>
      <mavon-editor v-model="article.content" :toolbarsFlag="false" defaultOpen="preview" style="margin-top:15px"/>
      <el-button type="primary" @click="submit()">提交</el-button>
  </el-main>
</template>

<script>
export default {
    name:"Editor",
    data (){
        return{
            article:{
                title:'',
                content:''
            }
        }
    },
    methods:{
        submit(){
            let me=this;
            axios.post('http://localhost:8080/article',me.article)
            // {
            //     headers:{
            //         'Authorization':localStorage.getItem('token')
            //     }
            // })
            .then(function (response){
                me.content=response.data;
                window.alert("添加成功");
                me.$router.push('/');
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