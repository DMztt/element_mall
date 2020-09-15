<template>
  <div>
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="rolesList" stripe style="width: 100%" border>
      <el-table-column type="expand">
        <template v-slot="scoped">
          <el-row v-for="(item,i) in scoped.row.children" :key="item.id">
            <el-col :span="5">
              <el-tag closable>{{item.authName}}</el-tag>
            </el-col>
            <el-col :span="19">
              <el-row v-for="(item2,i2) in item.children" :key="item2.id">
                <el-col :span="6">
                  <el-tag closable type="success">{{item2.authName}}</el-tag>
                </el-col>
                <el-col :span="18">
                  <el-tag
                    closable
                    type="warning"
                    v-for="(item3,i3) in item2.children"
                    :key="item3.id"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
      <el-table-column prop="level" label="操做">
        <template v-slot="scoped">
          <el-button
            size="small"
            type="warning"
            icon="el-icon-s-tools"
            @click="showSetRightDialong(scoped.row)"
          >分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="setRightDialog" width="50%">
      <el-tree
        :data="rightList"
        :props="defaultProps"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="defaultKeys"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialog = false">取 消</el-button>
        <el-button type="primary" @click="setRightDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoles, getRoleList } from 'network/rights'
export default {
  name: 'Rules',
  data() {
    return {
      rolesList: [],
      setRightDialog: false,
      rightList: [],
      defaultProps: {
        children: 'children',
        label: 'authName',
      },
      defaultKeys: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getRoles().then((res) => {
        // console.log(res)
        this.rolesList = res.data
      })
    },
    async showSetRightDialong(role) {
      const { data: res } = await getRoleList()
      console.log(res)
      this.getDefKeys(role, this.defaultKeys)
      this.rightList = res
      this.setRightDialog = true
    },
    getDefKeys(node, arr) {
      if(!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getDefKeys(item, arr)
      })
    }
  },
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 8px;
}
</style>>


