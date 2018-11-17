<template>
    <div>
        <div class="crumbs container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-lx-cascades"></i> 首页</el-breadcrumb-item>
                <el-breadcrumb-item>创建工地</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="container-title">
                <i class="el-icon-lx-cascades"></i> 基本信息
            </div>
            <div style="width: 60%;">
                <el-form ref="form" :model="form" label-width="90px">
                    <el-form-item label="工地名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="业主姓名">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="联系方式">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="设计师">
                                <el-select v-model="form.name" placeholder="请选择" filterable style="width: 100%">
                                    <el-option
                                        v-for="item in designers"
                                        :key="item.name"
                                        :label="item.name"
                                        :value="item.name"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="工长/PM">
                                <el-select v-model="form.name" placeholder="请选择" filterable style="width: 100%">
                                    <el-option
                                        v-for="item in designers"
                                        :key="item.name"
                                        :label="item.name"
                                        :value="item.name"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="合同时间">
                        <el-col :span="12">
                            <el-date-picker type="date" placeholder="开始时间" v-model="form.date1"
                                            style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col :span="12">
                            <el-date-picker placeholder="结束时间" v-model="form.date2"
                                            style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="备注信息">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <!--选材信息-->
        <div class="container" style="margin-top: 1%">
            <div class="container-title">
                <i class="el-icon-lx-cascades"></i> 选材信息
            </div>
            <div style="width: 100%;">
               <el-row :gutter="10">
                   <el-col :span="8">
                       <el-card class="card-css">
                           <div slot="header" class="clearfix">
                               <span>地砖</span>
                           </div>
                       </el-card>
                   </el-col>
                   <el-col :span="8">
                       <el-card class="card-css">
                           <div slot="header" class="clearfix">
                               <span>木地板</span>
                           </div>
                       </el-card>
                   </el-col>
                   <el-col :span="8">
                       <el-card class="card-css">
                           <div slot="header" class="clearfix">
                               <span>门</span>
                           </div>
                       </el-card>
                   </el-col>
               </el-row>

                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-card class="card-css">
                            <div slot="header" class="clearfix">
                                <span>橱柜</span>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card class="card-css">
                            <div slot="header" class="clearfix">
                                <span>洁具</span>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card class="card-css">
                            <div slot="header" class="clearfix">
                                <span>石材</span>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>

                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-card class="card-css">
                            <div slot="header" class="clearfix">
                                <span>铝扣板/生态木</span>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card class="card-css">
                            <div slot="header" class="clearfix">
                                <span>乳胶漆</span>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card class="card-css">
                            <div slot="header" class="clearfix">
                                <span>石膏线</span>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>

                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-card class="card-css">
                            <div slot="header" class="clearfix">
                                <span>墙纸</span>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card class="card-css">
                            <div slot="header" class="clearfix">
                                <span>衣柜</span>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "new-project",
        data: function () {
            return {
                designers: [
                    {
                        name: '张三',
                        disabled: false
                    },
                    {
                        name: '李四',
                        disabled: false
                    },
                    {
                        name: '王麻子',
                        disabled: true
                    },
                    {
                        name: '赵钱孙',
                        disabled: false
                    }
                ],
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: true,
                    type: ['步步高'],
                    resource: '小天才',
                    desc: '',
                    options: []
                }
            }
        },
        methods: {
            onSubmit() {
                this.$message.success('提交成功！');
            }
        }
    }
</script>

<style scoped>
    .container-title{
        min-height: 18px;
        font-size: 18px;
        color: #4A4A4A;
        margin: 5px;
        padding-bottom: 5px;
    }
    .card-css{
        height: 252px;
        overflow: auto;
        margin-bottom: 10px;
    }
</style>
