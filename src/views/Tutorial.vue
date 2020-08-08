<template>
    <el-container>
        <el-aside width="2%">
        </el-aside>
        <el-main class="editor">
            <h1 v-if="!edit">{{article.title}}</h1>
            <el-input v-if="edit" type="text" v-model="article.title"></el-input>
        <!--<mavon-editor v-model="value" :toolbarsFlag="false" defaultOpen="preview" />-->
            <markdown-it-vue v-if="!edit" class="md-body" :content="article.content"/>
            <div><!--v-if="this.$store.state.isAdmin"-->
                <mavon-editor v-if="edit" v-model="article.content" ref="md" :toolbarsFlag="true" @imgAdd="$imgAdd" @imgDel="$imgDel" defaultOpen="preview" style="margin-top:15px"/>
                <el-button v-if="!edit" type="primary" @click="edit=!edit" style="margin-top:15px">修改</el-button>
                <el-button v-if="edit" type="primary" @click="submitChange()" style="margin-top:15px">提交修改</el-button>
                <el-button v-if="edit" type="primary" @click="edit=!edit" style="margin-top:15px">取消</el-button>
                <el-button v-if="!edit" type="danger" @click="deleteContent()">删除</el-button>
                <!--
                    <el-button v-if="!edit" type="primary" @click="create()">新建</el-button>
                
                -->
            </div>
            <h1>共{{comment_count}}条评论</h1>
            <el-card class="comment" v-for="item in comments" :key="item.id" style="margin-top:10px;width:80%">
                <div slot="header" class="clearfix">
                    <span>{{item.text}}</span>
                </div>
                <div class="name">
                    {{item.username}}
                </div>
                <div class="time">
                    发表于：{{item.create_time}}
                </div>
            </el-card>
            <div class="block">
                <el-pagination
                    layout="prev, pager, next"
                    :total="pages*10" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
            <div class="newComment" v-if="this.$store.state.logged" style="margin-top:50px">
                <el-input type="textarea" placeholder="输入评论内容" v-model="newCommentText"></el-input>
                <el-button @click="newComment()">发表评论</el-button>
            </div>
            <div style="margin-top:10px" v-if="!this.$store.state.logged">
                <router-link to="/login">登录</router-link>后可发表评论
            </div>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: 'Tutorial',
    data () {
        return{
            value:'# asdf',
            article_id:this.$route.params.id,
            content_view_list:[],
            article:{},
            comments:[],
            newCommentText:'',
            pages:0,
            comment_count:0,
            edit:false,
        }
    },
    mounted(){
        this.loadArticle(this.article_id);
    },
    methods: {
        $imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('image', $file);
           let me =this;
           axios.post('http://localhost:8080/image',formdata, {
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
        },
        handleCurrentChange(val){
            this.loadComment(this.content_id,val)
        },
        loadArticle(article_id){
            let me=this;
            me.article_id=article_id;
            axios.get('http://localhost:8080/article',{
                params:{
                    id:article_id
                }
            })
            .then(function (response){
                me.article=response.data
            })
            .catch(function (error) {
                console.log(error);
            });
            me.loadCommentCount(content_id);
            me.loadComment(content_id,1);
        },
        deleteContent(){
            let me=this;
            axios.delete('http://localhost:8080/article',{
                params:{
                    id:me.article_id
                } 
            })
            .then(function (response){
                window.alert("删除成功");
                me.$router.push('/');
            })
            .catch(function (error) {
                window.console.log(error);
            });
        },
        submitChange(){
            let me=this;
            axios.put('http://localhost:8080/article',me.article,
            {
                headers:{
                    'Authorization':localStorage.getItem('token')
                },
            })
            .then(function (response){
                window.alert("修改成功");
                me.edit=!me.edit;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        newComment(){
            let me=this;
            axios.post('http://localhost:8080/tutorial/comment',
            {
                token:localStorage.getItem('token'),
                contentId:me.content_id,
                text:me.newCommentText
            },
            {
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            })
            .then(function (response){
                alert(response.data);
                me.loadComment(me.content_id,1);
                me.loadCommentCount(content_id);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        loadComment(content_id,page){
            let me=this;
            axios.get('http://localhost:8080/tutorial/comment',{
                params:{
                    id:content_id,
                    page:page
                }
            })
            .then(function (response){
                me.comments=response.data
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        loadCommentCount(content_id){
            let me=this;
            axios.get('http://localhost:8080/tutorial/commentCount',{
                params:{
                    id:content_id,
                }
            })
            .then(function (response){
                me.comment_count=response.data;
                me.pages=Math.floor((response.data-1)/5+1);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
    }
}
</script>

<style scoped>
    .time,.name{
        font-size: 13px;
    }
</style>