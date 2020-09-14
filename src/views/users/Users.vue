<template>
  <div class="users">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
           <el-input
        class="card-input"
        placeholder="请输入内容"
        v-model="queryInfo.query"
        clearable
        @clear="queryUser"
      >
        <el-button slot="append" icon="el-icon-search" @click="queryUser"></el-button>
      </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <el-table :data="usersList" stripe style="width: 100%" border class="user_table">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <template v-slot="state">
            <el-switch v-model="state.row.mg_state" @change="switchUserState(state.row)" />
          </template>
        </el-table-column>
        <el-table-column label="操做" width="180">
          <template v-slot="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" rounde></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" rounde></el-button>
            <el-tooltip :enterable="false" effect="dark" content="分配角色" placement="top">
              <el-button size="mini" type="warning" icon="el-icon-s-tools" rounde></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%">
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, getUserState } from 'network/users'
export default {
  name: 'Users',
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
      usersList: [],
      total: null,
      dialogVisible: false,
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      const { query, pagenum, pagesize } = this.queryInfo
      getUserList(query, pagenum, pagesize).then((res) => {
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error('获取信息失败')
        this.usersList = res.data.users
        this.total = res.data.total
      })
    },
    addUser() {},
    queryUser() {
      this.getUserList()
    },
    handleSizeChange(size) {
      // console.log(size)
      this.queryInfo.pagesize = size
      this.getUserList()
    },
    handleCurrentChange(newPage) {
      // console.log(newPage, '11')
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    switchUserState(userInfo) {
      // console.log(userInfo)
      const { id, mg_state: state } = userInfo
      getUserState(id, state).then((res) => {
        // console.log(res)
        if (res.meta.status !== 200) {
          this.$message.error('修改失败')

        }
        this.getUserList()
      })
    },
  },
}
</script>
<style scoped lang="less">
.user_table {
  margin-top: 20px;
}
.breadcrumb {
  margin-bottom: 15px;
}
</style>
