<template>
    <el-container>
        <el-aside width="20%">
            <el-menu>
                <el-menu-item v-for="item in content_view_list" :key="item.content_id" :index="item.content_id" @click="loadContent(item.content_id)">
                {{item.content_headline}}
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main class="editor">
        <!--<mavon-editor v-model="value" :toolbarsFlag="false" defaultOpen="preview" />-->
            <markdown-it-vue v-if="!edit" class="md-body" :content="content.text"/>
            <div v-if="this.$store.state.logged">
            <mavon-editor v-model="content.text" v-if="edit" :toolbarsFlag="false" defaultOpen="preview" style="margin-top:15px"/>
            <el-button v-if="!edit" type="primary" @click="edit=!edit" style="margin-top:15px">修改</el-button>
            <el-button v-if="edit" type="primary" @click="submitChange()" style="margin-top:15px">提交修改</el-button>
            <el-button v-if="edit" type="primary" @click="edit=!edit" style="margin-top:15px">取消</el-button>
            <el-button v-if="!edit" type="primary" @click="create()">新建</el-button>
            <el-button v-if="!edit" type="primary" @click="deleteContent()">删除</el-button>
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
            title_id:this.$route.params.id,
            content_id:0,
            content_view_list:[],
            content:{},
            comments:[],
            newCommentText:'',
            pages:0,
            comment_count:0,
            edit:false,
        }
    },
    mounted(){
        this.loadHeadline();
    },
    methods: {
        loadHeadline(){
            let me=this;
            axios.get('http://localhost:8080/tutorial/contentView',{
                params:{
                    titleId:me.title_id
                }
            })
            .then(function (response){
                me.content_view_list=response.data;
                me.loadContent(me.content_view_list[0].content_id);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        handleCurrentChange(val){
            this.loadComment(this.content_id,val)
        },
        loadContent(content_id){
            let me=this;
            me.content_id=content_id;
            axios.get('http://localhost:8080/tutorial/content',{
                params:{
                    id:content_id
                }
            })
            .then(function (response){
                me.content=response.data
            })
            .catch(function (error) {
                console.log(error);
            });
            me.loadCommentCount(content_id);
            me.loadComment(content_id,1);
        },
        deleteContent(){
            let me=this;
            axios.get('http://localhost:8080/tutorial/deleteContent',{
                params:{
                    id:me.content_id
                } 
            })
            .then(function (response){
                window.alert("删除成功");
                me.loadHeadline();
            })
            .catch(function (error) {
                window.console.log(error);
            });
        },
        submitChange(){
            let me=this;
            axios.post('http://localhost:8080/tutorial/content',me.content,
            {
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            })
            .then(function (response){
                window.alert("修改成功");
                me.edit=!me.edit;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        create(){
            this.$router.push('/editor/'+this.title_id);
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