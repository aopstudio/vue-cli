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
            <div >
            <markdown-it-vue class="md-body" :content="content.text"/>
            <mavon-editor v-model="content.text" :toolbarsFlag="false" defaultOpen="preview" style="margin-top:15px"/>
            <el-button type="primary" @click="submit()" style="margin-top:15px">提交修改</el-button>
            <el-button type="primary" @click="create()">新建</el-button>
            </div>
            <div class="comment" v-for="item in comments" :key="item.id">
                <div class="username">
                    {{item.username}}
                </div>
                <div class="text">
                    {{item.text}}
                </div>
                <div class="time">
                    {{item.createTime}}
                </div>
            </div>
            <div class="newComment">
                <el-input type="textarea" placeholder="输入评论内容" v-model="newCommentText"></el-input>
                <el-button @click="newComment()">发表评论</el-button>
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
            newCommentText:''
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
            me.loadComment(content_id);
        },
        submit(){
            let me=this;
            axios.post('http://localhost:8080/tutorial/content',me.content)
            .then(function (response){
                alert(response.data);
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
                me.loadComment(me.content_id);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        loadComment(content_id){
            let me=this;
            axios.get('http://localhost:8080/tutorial/comment',{
                params:{
                    id:content_id
                }
            })
            .then(function (response){
                me.comments=response.data
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
}
</script>

<style scoped>

</style>