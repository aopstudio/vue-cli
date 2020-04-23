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
            <markdown-it-vue class="md-body" :content="content.content"/>
            <mavon-editor v-model="content.content" :toolbarsFlag="false" defaultOpen="preview" style="margin-top:15px"/>
            <el-button type="primary" @click="submit()" style="margin-top:15px">提交</el-button>
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
            content_view_list:[],
            content:{}
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
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        loadContent(content_id){
            let me=this;
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
        },
        submit(){
            let me=this;
            axios.post('http://localhost:8080/tutorial/content',me.content)
            .then(function (response){
                me.content=response.data
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
}
</script>

<style scoped>
    div{
        
    }
</style>