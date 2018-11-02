<template>
    <div>
        <div class="crumbs container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>材料管理</el-breadcrumb-item>
                <el-breadcrumb-item>主材维护</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row :gutter="12">
                <el-col :span="6" v-for="(material,index) in materials" :key="index">
                    <el-card shadow="hover" style="margin: 5px 0;" :body-style="{ padding: '0px' }">
                        <img :src="material.imgUrl" class="image">
                        <div style="padding: 10px;text-align: center">
                            <span style="font-weight: bold;color: #666666">{{material.name}}</span>
                            <div class="bottom clearfix">
                                <el-button type="text" class="button" @click="redirect2Items(index)">详情</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                materials: []
            }
        },
        mounted: function () {
            //请求数据
            this.getData();
        },
        methods: {
            getData: function () {
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
    .image {
        width: 100%;
        height: 150px;
        display: block;
    }

    .bottom {
        margin-top: 5px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>
