<template>
  <div>
    <bread :titles="titles" />
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addCateDialog">添加分类</el-button>
        </el-col>
      </el-row>

      <el-table
        :data="cateList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="cat_id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效">
          <template v-slot="scoped">
            <i
              class="el-icon-success"
              v-if="scoped.row.cat_deleted === false"
              style="color: lightgreen"
            ></i>
            <i class="el-icon-error" v-else></i>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序">
          <template v-slot="scoped">
            <el-tag type="success" v-if="scoped.row.cat_level === 0">标签二</el-tag>
            <el-tag type="info" v-else-if="scoped.row.cat_level === 1">标签三</el-tag>
            <el-tag type="warning" v-else>标签一</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="cat_name" label="操做">
          <template v-slot="scoped">
            <el-button size="small" icon="el-icon-edit-outline" type="primary">编辑</el-button>
            <el-button size="small" icon="el-icon-delete-solid" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="cateQuery.pagenum"
        :page-sizes="[5, 8, 10, 20]"
        :page-size="cateQuery.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-dialog title="分类" :visible.sync="dialogVisible" width="50%" @close="dialogCloseClick">
      <el-form :model="cateForm" :rules="cateRules" label-width="100px" ref="addFormRef">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="cateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" prop="cat_level">
          <el-cascader
            v-model="selectKeys"
            :options="categroyList"
            :props="cateProps"
            @change="handleChange"
            clearable
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Bread from 'components/common/bread/Bread'
import { getCategory, getCateList, addCateList } from 'network/shop'
export default {
  name: 'categroy',
  components: {
    Bread,
  },
  data() {
    return {
      titles: ['商品管理', '商品分类'],
      cateQuery: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      cateList: [],
      total: 0,
      dialogVisible: false,
      cateRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ],
      },
      cateForm: {
        cat_pid: 0,
        cat_name: '',
        cat_level: 0,
      },
      categroyList: [],
      cateProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        checkStrictly: 'true',
      },
      selectKeys: [],
    }
  },
  mounted() {
    this.getCategory()
  },
  methods: {
    getCategory() {
      const { type, pagenum, pagesize } = this.cateQuery
      getCategory(type, pagenum, pagesize).then((res) => {
        // console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('获取失败')
        }
        this.cateList = res.data.result
        this.total = res.data.total
      })
    },
    handleSizeChange(size) {
      // console.log(size)
      this.cateQuery.pagesize = size
      this.getCategory()
    },
    handleCurrentChange(pagenum) {
      this.cateQuery.pagenum = pagenum
      this.getCategory()
    },
    addCateDialog() {
      this.getCateList()
      this.dialogVisible = true
    },
    dialogVisibleClick() {
      this.$refs.addFormRef.validate((valid) => {
        if (valid) {
          addCateList(this.cateForm).then((res) => {
            // console.log(res)
            this.dialogVisible = false
            this.getCategory()
          })
        }
      })
    },
    getCateList() {
      getCateList(2).then((res) => {
        console.log(res)
        this.categroyList = res.data
      })
    },
    handleChange() {
      // console.log(this.selectKeys)
      if (this.selectKeys.length > 0) {
        this.cateForm.cat_pid = this.selectKeys[this.selectKeys.length - 1]
        this.cateForm.cat_level = this.selectKeys.length
      } else {
        this.cateForm.cat_pid = 0
        this.cateForm.cat_level = 0
      }
    },
    dialogCloseClick() {
      this.selectKeys = []
      this.cateForm.cat_pid = 0
      this.cateForm.cat_level = 0
      this.$refs.addFormRef.resetFields()
    },
  },
}
</script>

<style lang="less" scoped>
</style>>


