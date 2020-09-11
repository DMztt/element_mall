<template>
  <div>
    <el-button @click="loginOut" size="small">推出</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    loginOut() {
      window.sessionStorage.clear()
      this.$router.push('./login')
    }
  }
}
</script>

<style>

</style>
