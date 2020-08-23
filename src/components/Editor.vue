<template>
  <el-main>
      <el-input type="text" v-model="article.title"></el-input>
      <mavon-editor v-model="article.content" ref="md" :toolbarsFlag="true" @imgAdd="$imgAdd" @imgDel="$imgDel" defaultOpen="preview" style="margin-top:15px"/>
      <el-button type="primary" @click="submit()">提交</el-button>
  </el-main>
</template>

<script>
export default {
    name:"Editor",
    data (){
        return{
            server:process.env.VUE_APP_SERVER,
            article:{
                title:'',
                content:''
            }
        }
    },
    methods:{
        submit(){
            let me=this;
            axios.post(`${this.server}/article`,me.article)
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
        },
        $imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('image', $file);
           let me =this;
           axios.post(`${this.server}/image`,formdata, {
             headers: { 'Content-Type': 'multipart/form-data' },
           }
           ).then(function (response){
               // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
               /**
               * $vm 指为mavonEditor实例，可以通过如下两种方式获取
               * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
               * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
               */
               me.$refs.md.$img2Url(pos, response.data);
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