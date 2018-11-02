<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 5px">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>主材维护</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="12" style="margin: 1%">
            <el-col :span="6" v-for="(material,index) in materials" :key="index">
                <el-card shadow="hover" style="margin: 5px 0;cursor: pointer;">
                    <div style="padding: 14px; text-align: center" @click="redirect2Items(index)">
                        <span style="font-weight: bold;color: #666666">{{material.name}}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                materials: []
            }
        },
        mounted:function(){
            //请求数据
            this.getData();
        },
        methods: {
            getData:function () {
                const that = this;
                this.$axios.get('/api/decoration/material/list')
                    .then(function (response) {
                        that.materials = response.data.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            redirect2Items: function (index) {
                alert(JSON.stringify(this.materials[index]));
            }
        }
    }
</script>

<style scoped>

</style>
