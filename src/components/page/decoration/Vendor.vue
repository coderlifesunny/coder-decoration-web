<template>
    <div>
        <div class="crumbs container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-lx-cascades"></i> 首页</el-breadcrumb-item>
                <el-breadcrumb-item>材料管理</el-breadcrumb-item>
                <el-breadcrumb-item>主材管理</el-breadcrumb-item>
                <el-breadcrumb-item>商家维护</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <div class="handle-box">
                    <el-form :inline="true" :model="requestParam">
                        <el-form-item label="商家">
                            <el-input v-model="requestParam.name" placeholder="商家名称"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="requestParam.status">
                                <el-option label="全部" value="-999">全部</el-option>
                                <el-option label='有效' value="1">有效</el-option>
                                <el-option label="无效" value="0">无效</el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="query">查询</el-button>
                            <el-button type="success" @click="handleAdd">新增</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <el-table :data="tableData" border class="table" v-loading="loading">
                <el-table-column prop="companyName" label="公司名称" sortable>
                </el-table-column>
                <el-table-column prop="contactName" label="联系人">
                </el-table-column>
                <el-table-column prop="contactTel" label="联系方式">
                </el-table-column>
                <el-table-column prop="contactAdd" label="联系地址">
                </el-table-column>
                <el-table-column prop="materialItemNum" label="经营主材数">
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
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" round icon="el-icon-delete" @click="handleDelete(scope.$index)"></el-button>
                    </template>
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
        name: 'vendor',
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
                    name:'',
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
            },
            handleAdd() {
               //跳转到另外一个页面
            },
            handleDelete(index) {
                const item = this.tableData[index];
                this.optId = item.id;
                this.$confirm('此操作将永久删除该型号, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteEvt();
                });
            },
            deleteEvt() {
                // this.$axios.post('/api/decoration/standard/delete', {id: this.optId}).then((res) => {
                //     if(res.data.code==='2000'){
                //         this.$message.success('删除成功');
                //         this.query();
                //     }else{
                //         this.$alert(res.data.msg, '提示', {
                //             confirmButtonText: '知道了'
                //         });
                //     }
                // });
            }
        }
    }

</script>

<style scoped>


</style>
