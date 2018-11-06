<template>
    <div>
        <div class="crumbs container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-lx-cascades"></i> 首页</el-breadcrumb-item>
                <el-breadcrumb-item>工地管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <div class="handle-box">
                    <el-form :inline="true" :model="requestParam">
                        <el-form-item label="项目名称">
                            <el-input v-model="requestParam.name" placeholder="项目名称"></el-input>
                        </el-form-item>
                        <el-form-item label="设计师">
                            <el-input v-model="requestParam.designer" placeholder="设计师"></el-input>
                        </el-form-item>
                        <el-form-item label="工长/PM">
                            <el-input v-model="requestParam.manager" placeholder="项目经理"></el-input>
                        </el-form-item>
                        <el-form-item label="业主">
                            <el-input v-model="requestParam.owner" placeholder="业主"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="requestParam.status">
                                <el-option label="全部" value="-999">全部</el-option>
                                <el-option label='未开工' value="1">未开工</el-option>
                                <el-option label='施工中' value="2">施工中</el-option>
                                <el-option label="已竣工" value="4">已竣工</el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="query">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <el-table :data="tableData" border class="table" v-loading="loading">
                <el-table-column prop="name" label="工地名称">
                </el-table-column>
                <el-table-column prop="owner" label="业主">
                </el-table-column>
                <el-table-column prop="ownTel" label="联系方式">
                </el-table-column>
                <el-table-column prop="designer" label="设计师">
                </el-table-column>
                <el-table-column prop="manager" label="工长/PM">
                </el-table-column>
                <el-table-column prop="tag" label="状态">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.tag === '有效' ? 'success' : 'warning'"
                            disable-transitions>{{scope.row.tag}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="operateUser" label="操作人">
                </el-table-column>
                <el-table-column prop="modified" label="最近修改时间">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="requestParam.currentPage"
                    :page-size="requestParam.pageSize"
                    :page-sizes="pageProp.pageSizes"
                    layout="total, sizes, prev, pager, next"
                    :total="pageProp.totalCount">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'project',
        data() {
            return {
                mainName:'',
                pageProp: {
                    totalCount: 0,
                    pageCount: 0,
                    pageSizes: [20, 40, 60]
                },
                loading: false,
                requestParam: {
                    name:'',//工地名称
                    designer:'',//设计师
                    manager:'',//工长/PM
                    owner:'',//业主
                    status: '-999',
                    currentPage: 1,
                    pageSize: 20
                },
                tableData: [],
                optId:-1
            }
        },
        created() {
        },
        mounted(){
            this.query();
        },
        methods: {
            handleSizeChange(val) {
                this.requestParam.pageSize = val;
                this.query();
            },
            handleCurrentChange(val) {
                this.requestParam.currentPage = val;
                this.query();
            },
            query(){
                // this.loading = true;
                // this.$axios.post('/api/decoration/material_item', this.requestParam).then((res) => {
                //     this.loading = false;
                //     this.tableData = res.data.data.list;
                //     this.requestParam.currentPage = res.data.data.currentPage;
                //     this.pageProp.pageCount = res.data.data.pageCount;
                //     this.pageProp.totalCount = res.data.data.totalCount;
                // })
            }
        }
    }

</script>

<style scoped>


</style>
