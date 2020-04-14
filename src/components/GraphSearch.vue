<template>
    <div>
        <el-form :model="search" ref="search">
            <el-form-item prop="name" label="关键词">
                <el-input v-model="search.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style>

</style>

<script>
export default {
    name: "GraphSearch",
    data() {
        return {
            search: {
                name: ""
            }
        };
    },
    methods: {
        submit(){
            this.search.name=this.$store.state.count;
        }
    }
}
</script>