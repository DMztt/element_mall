<template>
  <div>
    <bread :titles="titles" />
    <el-table :data="rightsList" stripe style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="权限等级">
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
import Bread from 'components/common/bread/Bread'
import { getRightsList } from 'network/rights'
export default {
  name: 'Rights',
  components: {
    Bread
  },
  data() {
    return {
      rightsList: [],
      titles: ['权限管理','权限列表']
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getRightsList().then((res) => {
        // console.log(res)
        this.rightsList = res.data
      })
    },
  },
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
</style>
