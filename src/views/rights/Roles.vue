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
                 <el-tag closable  type="success">{{item2.authName}}</el-tag>
                </el-col>
                <el-col :span="18"></el-col>
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
          <el-tag v-if="scoped.row.level === '0'">标&emsp;签&nbsp;一</el-tag>
          <el-tag v-else-if="scoped.row.level === '1'" type="success">标签二</el-tag>
          <el-tag v-else type="info">标签三</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getRoles } from 'network/rights'
export default {
  name: 'Rules',
  data() {
    return {
      rolesList: [],
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getRoles().then((res) => {
        console.log(res)
        this.rolesList = res.data
      })
    },
  },
}
</script>

<style lang="less" scoped>
</style>>


