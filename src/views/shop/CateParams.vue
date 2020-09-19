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
          <el-button size="mini" type="primary" :disabled="isDisabled" @click="addParams">添加参数</el-button>
          <el-table :data="manyTableList" border style="width: 100%">
            <el-table-column type="expand">
              <template v-slot="scoped">
                <el-tag
                  class="tag"
                  v-for="(item,i) in scoped.row.attr_vals"
                  :key="i"
                  closable
                  @close="handleClose(i, scoped.row)"
                >{{item}}</el-tag>
                <el-input
                  v-if="scoped.row.inputVisible"
                  v-model="scoped.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  class="input-tag"
                  @keyup.enter.native="handleInputConfirm(scoped.row)"
                  @blur="handleInputConfirm(scoped.row)"
                ></el-input>
                <el-button v-else size="small" @click="showInput(scoped.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="attr_name" label="参数名称"></el-table-column>
            <el-table-column label="操做">
              <template v-slot="scoped">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="editClick(scoped.row)"
                >编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete-solid">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button size="mini" type="primary" :disabled="isDisabled" @click="addParams">添加属性</el-button>
          <el-table :data="onlyTableList" border style="width: 100%">
            <el-table-column type="expand">
              <template v-slot="scoped">
                <el-tag
                  class="tag"
                  v-for="(item,i) in scoped.row.attr_vals"
                  :key="i"
                  closable
                  @close="handleClose(i, scoped.row)"
                >{{item}}</el-tag>
                <el-input
                  v-if="scoped.row.inputVisible"
                  v-model="scoped.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  class="input-tag"
                  @keyup.enter.native="handleInputConfirm(scoped.row)"
                  @blur="handleInputConfirm(scoped.row)"
                ></el-input>
                <el-button v-else size="small" @click="showInput(scoped.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="attr_name" label="属性名称"></el-table-column>
            <el-table-column label="操做">
              <template v-slot="scoped">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="editClick(scoped.row)"
                >编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete-solid">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog :title="'修改' + titlesText" :visible.sync="editDialog" width="50%" @close="resetForm">
      <el-form :model="editForm" :rules="Formrules" ref="ruleEditForm" label-width="100px">
        <el-form-item :label="titlesText" prop="attr_name">
          <el-input v-model="editForm.attr_name" @input="inputChange"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="addDialogClick">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="'添加' + titlesText" :visible.sync="AddDialog" width="50%">
      <el-form :model="addForm" :rules="Formrules" ref="ruleAddForm" label-width="100px">
        <el-form-item :label="titlesText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddDialog = false">取 消</el-button>
        <el-button type="primary" @click="AddDialogForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Bread from 'components/common/bread/Bread'
import { getCateList, getParamsList, addParams, editParams, editSubParams } from 'network/shop'
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
      onlyTableList: [],
      editDialog: false,
      editForm: {
        attr_name: '',
      },
      addForm: {
        attr_name: '',
      },
      Formrules: {
        attr_name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      },
      AddDialog: false,
      isChange: false,
      isChangeForm: {},
    }
  },
  mounted() {
    this.getParams()
    this.getParamsList()
  },
  computed: {
    isDisabled() {
      return this.selectKeys.length === 3 ? false : true
    },
    titlesText() {
      return this.activeName === 'many' ? '动态参数' : '静态属性'
    },
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
    getParamsList() {},
    handleChange() {
      if (this.selectKeys.length !== 3) {
        this.selectKeys = []
        this.manyTableList = []
        this.onlyTableList = []
      } else {
        // console.log(this.selectKeys)
        const id = this.selectKeys[this.selectKeys.length - 1]
        // console.log(id)
        getParamsList(id, this.activeName).then((res) => {
          // console.log(res)
          res.data.forEach((item) => {
            item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
            item.inputVisible = false
            item.inputValue = ''
          })
          // console.log(res)
          if (this.activeName === 'many') {
            this.manyTableList = res.data
          } else {
            this.onlyTableList = res.data
          }
        })
      }
    },
    handleClick() {
      // console.log(this.activeName)
      this.handleChange()
    },
    editClick(scoped) {
      this.editForm = scoped
      this.isChangeForm = scoped
      this.editDialog = true
    },
    addDialogClick() {
      this.$refs.ruleEditForm.validate(async (valid) => {
        if (!valid) return
        if (this.isChange) {
          const id = this.selectKeys[this.selectKeys.length - 1]
          const res = await editParams(id, this.editForm.attr_name)
          console.log(res)
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    addParams() {
      this.AddDialog = true
    },
    AddDialogForm() {
      this.$refs.ruleAddForm.validate(async (valid) => {
        if (!valid) {
          return this.$message.error('请检查是否正确输入')
        } else {
          const id = this.selectKeys[this.selectKeys.length - 1]
          let data = {}
          data['attr_name'] = this.addForm.attr_name
          data.attr_sel = this.activeName
          const res = await addParams(id, data)
          if (res.meta.status !== 201) return
          console.log(res)
          this.$message.success('创建成功')
          this.AddDialog = false
        }
      })
    },
    inputChange() {
      // console.log('111')
      this.isChange = true
    },
    async handleInputConfirm(row) {
      if(row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
        return
      }
      row.attr_vals.push(row.inputValue.trim())
      const id = this.selectKeys[this.selectKeys.length - 1]
      const attr_vals = row.attr_vals.join(' ')
      const res = await editSubParams(id, row.attr_id, row.attr_name, this.activeName, attr_vals)
      console.log(res)
      if(res.meta.status !== 200) return
      this.$message.success('成功')
      row.inputValue = ''
      row.inputVisible = false
    },
    async saveAttrVal(row) {
      const id = this.selectKeys[this.selectKeys.length - 1]
      const attr_vals = row.attr_vals.join(' ')
      const res = await editSubParams(id, row.attr_id, row.attr_name, this.activeName, attr_vals)
      console.log(res)
      if(res.meta.status !== 200) return
      this.$message.success('成功')
    },
    showInput(row) {
      row.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleClose(i, row) {
      row.attr_vals.splice(i, 1)
      // console.log(row)
      this.saveAttrVal(row)
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
.tag {
  margin-right: 10px;
}
.input-tag {
  width: 120px;
}
</style>>


