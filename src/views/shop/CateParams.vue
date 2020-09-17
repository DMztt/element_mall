<template>
  <div>
    <bread :titles="titles" />
    <el-card>
      <el-alert title="只允许为第三级分类设置相关参数" type="warning" show-icon :closable="false"></el-alert>
      <el-row class="row">
        <el-col>
          <span class="text">选择商品分类:</span>
          <el-cascader
            v-model="selectKeys"
            :options="optionsParams"
            @change="handleChange"
            :props="propsCascAder"
            size="small"
          />
        </el-col>
      </el-row>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button size="mini" type="primary" :disabled="isDisabled">添加参数</el-button>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button size="mini" type="primary" :disabled="isDisabled">添加属性</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Bread from 'components/common/bread/Bread'
import { getCateList, getParamsList } from 'network/shop'
export default {
  components: {
    Bread,
  },
  data() {
    return {
      titles: ['商品管理', '参数列表'],
      optionsParams: [],
      propsCascAder: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover',
      },
      selectKeys: [],
      activeName: 'many',
      manyTableList: [],
      onlyTableList: []
    }
  },
  mounted() {
    this.getParams()
    this.getParamsList()
  },
  computed: {
    isDisabled() {
      return this.selectKeys.length === 3 ? false : true
    }
  },
  methods: {
    getParams() {
      getCateList().then((res) => {
        // console.log(res)
        if (res.meta.status !== 200) {
          return this.message.error('获取失败')
        }
        this.optionsParams = res.data
      })
    },
    getParamsList() {

    },
    handleChange() {
      if (this.selectKeys.length !== 3) {
        this.selectKeys = []
      } else {
        // console.log(this.selectKeys)
        const id = this.selectKeys[this.selectKeys.length - 1]
        // console.log(id)
      getParamsList(id, this.activeName).then(res => {
        // console.log(res)
        if(this.activeName === 'many') {
          this.manyTableList = res.data
        }else {
          this.onlyTableList = res.data
        }
      })
      }
    },
    handleClick() {
      // console.log(this.activeName)
      this.handleChange()
    }
  },
}
</script>

<style lang="less" scoped>
.row {
  margin: 15px 0;
  .text {
    margin-right: 15px;
  }
}
</style>>


