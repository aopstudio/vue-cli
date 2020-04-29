<template>
    <el-container>
        <el-header id="nav">
        <el-col :span=21>
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal"  router>
            <el-menu-item index="/manage/info">个人资料</el-menu-item>
            <el-menu-item index="/manage/password">修改密码</el-menu-item>
        </el-menu>
        </el-col>
        </el-header>
        <el-main>
            <router-view/>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: 'Manage'
}
</script>

<style scoped>

</style>