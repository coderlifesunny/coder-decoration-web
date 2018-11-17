<template>
    <div>
        <div class="crumbs container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-lx-cascades"></i> 首页</el-breadcrumb-item>
                <el-breadcrumb-item>材料管理</el-breadcrumb-item>
                <el-breadcrumb-item>主材规格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form :inline="true" :model="requestParam">
                    <el-form-item label="规格">
                        <el-input v-model="requestParam.name" placeholder="规格"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="requestParam.status" placeholder="规格状态">
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
            <el-table :data="tableData" border class="table" v-loading="loading">
                <el-table-column prop="name" label="规格" sortable>
                </el-table-column>
                <el-table-column prop="remark" label="备注">
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
                        <el-button type="primary" size="mini" round icon="el-icon-edit" @click="handleEdit(scope.$index)"></el-button>
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
        <!-- form弹出框 -->
        <el-dialog :title="formTitle" :visible.sync="formVisible" width="30%">
            <el-form ref="formModal" :model="formModal" label-width="50px">
                <el-form-item label="规格">
                    <el-input v-model="formModal.name" placeholder="请输入规格"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="formModal.status" style="width: 100%;">
                        <el-option label='有效' value="1">有效</el-option>
                        <el-option label="无效" value="0">无效</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="formModal.remark"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="formVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEvt">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'standard',
        data() {
            return {
                pageProp: {
                    totalCount: 0,
                    pageCount: 0,
                    pageSizes: [20, 40, 60]
                },
                loading: true,
                requestParam: {
                    name: '',
                    status: '-999',
                    currentPage: 1,
                    pageSize: 20
                },
                tableData: [],
                formModal: {
                    id: '',
                    name: '',
                    status: '1',
                    remark: ''
                },
                formVisible: false,
                formTitle: '添加',
                optId:-1
            }
        },
        created() {
            this.query();
        },
        computed: {},
        methods: {
            handleSizeChange(val) {
                this.requestParam.pageSize = val;
                this.query();
            },
            handleCurrentChange(val) {
                this.requestParam.currentPage = val;
                this.query();
            },
            query() {
                this.loading = true;
                this.$axios.post('/decoration/standard', this.requestParam).then((res) => {
                    this.loading = false;
                    this.tableData = res.data.data.list;
                    this.requestParam.currentPage = res.data.data.currentPage;
                    this.pageProp.pageCount = res.data.data.pageCount;
                    this.pageProp.totalCount = res.data.data.totalCount;
                })
            },
            handleEdit(index) {
                this.formTitle = '编辑';
                const item = this.tableData[index];
                this.formModal = {
                    id:item.id,
                    name: item.name,
                    status: item.status + '',
                    remark: item.remark
                };
                this.formVisible = true;
            },
            handleAdd() {
                this.formTitle = '增加';
                this.formModal = {
                    id: '-999',
                    name: '',
                    status: '1',
                    remark: ''
                };
                this.formVisible = true;
            },
            handleDelete(index) {
                const item = this.tableData[index];
                this.optId = item.id;
                this.$confirm('此操作将永久删除该规格, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteEvt();
                });
            },
            saveEvt() {
                let url = this.formTitle === '增加' ? '/decoration/standard/add' : '/decoration/standard/modify';
                this.$axios.post(url, this.formModal).then((res) => {
                    if(res.data.code === '2000'){
                        this.$message.success('保存成功');
                        this.formVisible = false;
                        this.query();
                    }else{
                        this.$alert(res.data.msg, '提示', {
                            confirmButtonText: '知道了'
                        });
                    }
                });
            },
            deleteEvt() {
                this.$axios.post('/decoration/standard/delete', {id: this.optId}).then((res) => {
                    if(res.data.code==='2000'){
                        this.$message.success('删除成功');
                        this.query();
                    }else{
                        this.$alert(res.data.msg, '提示', {
                            confirmButtonText: '知道了'
                        });
                    }
                });
            }
        }
    }

</script>

<style scoped>


</style>
