<template>
  <div>
    <el-alert class="alert" title="添加商品信息" type="info" center show-icon :closable="false" />

    <el-steps
      class="steps"
      :space="200"
      :active="+activeIndex"
      finish-status="success"
      align-center
    >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <el-form
      :model="addForm"
      :rules="addFormRules"
      ref="ruleFormRef"
      label-width="100px"
      label-position="top"
    >
      <el-tabs
        :tab-position="'left'"
        v-model="activeIndex"
        style="margin-top: 20px"
        :before-leave="beforeClick"
        @tab-click="tabClick"
      >
        <el-tab-pane label="基本信息" name="0">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="addForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input v-model="addForm.goods_price" type="number"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input v-model="addForm.goods_weight" type="number"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input v-model="addForm.goods_number" type="number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="goods_cat">
            <el-cascader
              v-model="addForm.goods_cat"
              :options="cateList"
              :props="propsAder"
              @change="handleChange"
              size="small"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">
          <el-form-item :label="item.attr_name" v-for="(item,i) in manyTableList" :key="i" />
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <el-upload
            action="http://timemeetyou.com:8889/api/private/v1/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture"
            :headers="headersObj"
            :on-success="handleSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">
          <quill-editor
            v-model="addForm.goods_introduce"
            ref="myQuillEditor"
          ></quill-editor>
          <el-button type="primary" @click="submitValue">添加按钮</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import { getCateList, getParamsList } from 'network/shop'
export default {
  data() {
    return {
      activeIndex: '0',
      addForm: {
        goods_name: '',
        goods_cat: [],
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: '',
        pics: [],
        attrs: '',
      },
      cateList: [],
      addFormRules: {
        goods_name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        goods_price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
        ],
        goods_number: [
          { required: true, message: '请输入数量', trigger: 'blur' },
        ],
        goods_weight: [
          { required: true, message: '请输入重量', trigger: 'blur' },
        ],
        goods_cat: [{ required: true, message: '请输入分类', trigger: 'blur' }],
      },
      propsAder: {
        expandTrigger: 'hover',
        children: 'children',
        value: 'cat_id',
        label: 'cat_name',
      },
      selectKeys: [],
      manyTableList: [],
      headersObj: {
        Authorization: window.sessionStorage.getItem('token'),
      },
    }
  },
  computed: {
    cateId() {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      }
      return null
    },
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getCateList().then((res) => {
        // console.log(res)
        this.cateList = res.data
      })
    },
    handleChange() {
      console.log(this.addForm.goods_cat)
    },
    beforeClick(newActive, oldValue) {
      // console.log(newActive,oldValue)
      if (this.activeIndex === '0' && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请选择分类')
        return false
      }
    },
    tabClick(active) {
      if (this.activeIndex === '1') {
        console.log(typeof this.cateId)
        getParamsList(this.cateId, 'many').then((res) => {
          console.log(res)
          res.data.forEach((item) => {
            return (item.attr_vals =
              item.attr_vals.length === 0 ? [] : item.attr_vals.split(''))
          })
          if (res.meta.status === 200) {
            this.manyTableList = res.data
          }
        })
      }
    },
    handlePreview() {},
    handleRemove(file, fileList) {
      console.log(file, fileList)
      const filePath = file.response.data.tmp_path
      const index = this.addForm.pics.findIndex((item) => item === filePath)
      this.addForm.pics.splice(index, 1)
    },
    handleSuccess(resp) {
      // console.log(resp)
      this.addForm.pics.push(resp.data.tmp_path)
    },
    submitValue() {
      this.$refs.ruleFormRef.validate(valid => {
        if(!valid) {
          return this.$message.error('请填写必要信息')
        }
        let form = JSON.parse(JSON.stringify(this.addForm))
        // console.log(form)
        form.goods_cat = form.goods_cat.join(',')
      })
    }
  },
}
</script>
<style scoped>
.steps >>> .el-step__title {
  font-size: 12px;
}
</style>
<style  lang="less">
.alert {
  margin: 15px;
}
.ql-editor {
  height: 200px
}
</style>

