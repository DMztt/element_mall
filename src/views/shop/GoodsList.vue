<template>
  <div>
    <el-button type="primary" size="small" @click="jumpAddGoods">添加商品</el-button>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" ></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" ></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" ></el-table-column>
      <el-table-column prop="add_time" label="创建时间" >
        <template v-slot="scoped">
          {{scoped.row.add_time | formDate}}
        </template>
      </el-table-column>
      <el-table-column  label="操做" ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getGoodsList } from 'network/shop'
import { dateFormat } from 'utils/index'
export default {
  data() {
    return {
      list: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0
    }
  },
  filters: {
    formDate(row) {
      return dateFormat(row)
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getGoodsList(this.queryInfo).then(res => {
        console.log(res)
        this.list = res.data['goods']
        this.total = res.data.total
      })
    },
    jumpAddGoods() {
      this.$router.push('goods/add')
    }
  }
}
</script>

<style>
</style>
