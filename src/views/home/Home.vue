<template>
  <el-container class="container">
    <el-header class="header">
      <div class="header_left">
        <img src="~assets/images/logo.png" alt />
        <span>电商管理后台</span>
      </div>
      <el-button @click="loginOut" size="small">推出</el-button>
    </el-header>
    <el-container>
      <el-aside class="aside" :width="isActive ? '64px': '200px'" ref="asideRef">
        <div class="flex_box" @click="flexBoxClick">| | |</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#66ccff"
          unique-opened
          class="menu"
          :collapse="isActive"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <el-submenu :index="'/' + item.id" v-for="(item, index) in menuList" :key="item.id">
            <template slot="title">
              <i :class="icons[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
                :index="'/' + item.path"
                v-for="item in menuList[index].children"
                :key="item.id"
                @click="savePath('/' + item.path)"
                >
              <template slot="title">
                <i class="el-icon-s-operation"></i>
                <span>{{item.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {getMenuList} from 'network/home.js'
export default {
  name: 'Home',
  data() {
    return {
      menuList: [],
      icons: {
        125: 'el-icon-s-custom',
        103: 'el-icon-s-tools',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-s-marketing',
      },
      isActive: false,
      activePath: ''
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  mounted() {
    this.getMenuList()
  },
  methods: {
    loginOut() {
      window.sessionStorage.clear()
      this.$router.push('./login')
    },
    getMenuList() {
      getMenuList().then(res => {
        console.log(res)
        if(res.meta.status === 200) {
          this.menuList = res.data
        }else {
          return this.$message.error('获取失败')
        }

      })
    },
    flexBoxClick() {
      this.isActive = ! this.isActive
    },
    savePath(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  .header {
    background-color: #666;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 20px;
    .header_left {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
      }
    }
  }
  .aside {
    background-color: #333744;
    .menu {
      border: 0
    }
    .flex_box {
      display: felx;
      height: 24px;
      background-color: #999;
      font-size: 14px;
      line-height: 24px;
      color: #fff;
      cursor: pointer;
      text-align: center;
  }
  }
  .main {
    padding: 20px;
    margin: 0;
  }

}
</style>
