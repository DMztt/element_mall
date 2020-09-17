<template>
  <div>
    <bread :titles="titles" />
    <el-button>添加分类</el-button>
  </div>
</template>

<script>
import Bread from 'components/common/bread/Bread'
export default {
  name: "categroy",
  components: {
    Bread
  },
  data() {
    return {
      titles: ['商品管理','商品分类']
    }
  }
}
</script>

<style lang="less" scoped>

</style>>


